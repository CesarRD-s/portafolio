import { isEmail } from "@/app/utils/isEmail";
import { ContactBackendError, sendContactMessage } from '@/app/lib/contact/server'
import type { ContactPayload } from '@/app/lib/contact/types'
import { NextRequest, NextResponse } from "next/server";
import { isIP } from "node:net";

const WINDOW_MS = 60_000
const MAX_REQUESTS_PER_WINDOW = 10
const MAX_NAME_LENGTH = 120
const MAX_EMAIL_LENGTH = 254
const MAX_MESSAGE_LENGTH = 5000

const rateStore = new Map<string, { count: number; resetAt: number }>()

export async function POST(req: NextRequest) {
    if (isRateLimited(getClientIp(req))) {
        return resp(false, 'Has alcanzado el límite de envíos. Intenta de nuevo más tarde.', 429)
    }

    const body = await readJson(req)
    if (!body) {
        return resp(false, 'Datos de entrada inválidos.', 400)
    }

    const name = typeof body.name === 'string' ? body.name.trim() : ''
    const email = typeof body.email === 'string' ? body.email.trim() : ''
    const message = typeof body.message === 'string' ? body.message.trim() : ''
    const company = typeof body.company === 'string' ? body.company.trim() : ''

    if (company) {
        return resp(false, 'No se pudo enviar el mensaje.', 400)
    }

    if (!name || !email || !message) {
        return resp(false, 'Todos los campos son obligatorios', 400)
    }

    if (!isEmail(email)) {
        return resp(false, 'Por favor, introduce una dirección de correo electrónico válida.', 400)
    }

    if (name.length > MAX_NAME_LENGTH) {
        return resp(false, `El nombre no puede superar los ${MAX_NAME_LENGTH} caracteres.`, 400)
    }

    if (email.length > MAX_EMAIL_LENGTH) {
        return resp(false, `El correo no puede superar los ${MAX_EMAIL_LENGTH} caracteres.`, 400)
    }

    if (message.length > MAX_MESSAGE_LENGTH) {
        return resp(false, `El mensaje no puede superar los ${MAX_MESSAGE_LENGTH} caracteres.`, 400)
    }

    const payload: ContactPayload = { name, email, message }

    try {
        await sendContactMessage(payload)
    } catch (error) {
        if (error instanceof ContactBackendError) {
            console.error('Error al enviar el mensaje de contacto:', {
                status: error.status,
                detail: error.detail,
            })

            if (error.status === 429) {
                return resp(false, 'Parece que se ha excedido el límite de solicitudes. Por favor, intenta nuevamente más tarde.', 429)
            }

            if ((error.status === 400 || error.status === 422) && error.detail) {
                return resp(false, error.detail, error.status)
            }
        }

        return resp(false, 'Parece que algo ha salido mal. Por favor, intenta nuevamente.', 500)
    }

    return resp(true, 'Tu mensaje ha sido enviado con éxito.', 200)
}
const resp = (success: boolean, message: string, statusCode: number) => {
    return NextResponse.json({ success, message }, { status: statusCode })
}

const getClientIp = (req: NextRequest): string => {
    const rawIp = req.headers.get('x-forwarded-for')?.split(',')[0]
        ?? req.headers.get('x-real-ip')

    return rawIp ? normalizeIp(rawIp) : 'unknown'
}

const normalizeIp = (value: string): string => {
    let ip = value.trim()

    if (ip.startsWith('[') && ip.endsWith(']')) {
        ip = ip.slice(1, -1)
    }

    const mappedIpv4 = ip.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/i)
    if (mappedIpv4) {
        ip = mappedIpv4[1]
    }

    return isIP(ip) ? ip : 'unknown'
}

const isRateLimited = (key: string): boolean => {
    const now = Date.now()
    const entry = rateStore.get(key)

    if (!entry || now >= entry.resetAt) {
        rateStore.set(key, { count: 1, resetAt: now + WINDOW_MS })
        prune()
        return false
    }

    entry.count += 1
    return entry.count > MAX_REQUESTS_PER_WINDOW
}

const prune = () => {
    if (rateStore.size < 1000) return

    const now = Date.now()
    for (const [key, entry] of rateStore) {
        if (now >= entry.resetAt) rateStore.delete(key)
    }
}

const readJson = async (req: NextRequest): Promise<Record<string, unknown> | null> => {
    try {
        const body = await req.json()
        return body && typeof body === 'object' ? body : null
    } catch {
        return null
    }
}
