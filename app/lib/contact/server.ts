import 'server-only'

import type { ContactPayload } from './types'

export class ContactBackendError extends Error {
    constructor(
        public readonly status: number,
        public readonly detail?: string,
    ) {
        super('El backend de contacto no pudo procesar la solicitud.')
        this.name = 'ContactBackendError'
    }
}

type BackendErrorResponse = {
    error?: {
        message?: string
    }
}

export async function sendContactMessage(payload: ContactPayload): Promise<void> {
    const apiUrl = process.env.API_URL
    const apiKey = process.env.API_KEY

    if (!apiUrl || !apiKey) {
        throw new ContactBackendError(500)
    }

    let response: Response

    try {
        response = await fetch(`${apiUrl}/contact`, {
            method: 'POST',
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey,
            },
            body: JSON.stringify(payload),
            signal: AbortSignal.timeout(8_000),
        })
    } catch {
        throw new ContactBackendError(500)
    }

    if (response.ok) return

    const data = await readJson<BackendErrorResponse>(response)
    throw new ContactBackendError(response.status, data?.error?.message)
}

async function readJson<T>(response: Response): Promise<T | null> {
    try {
        return await response.json() as T
    } catch {
        return null
    }
}

