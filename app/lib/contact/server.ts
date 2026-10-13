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

const API_HEALTH_CHECK_TIMEOUT_MS = 8_000
const API_STARTUP_TIMEOUT_MS = 70_000
const API_HEALTH_RETRY_DELAY_MS = 1_500
const API_READY_CACHE_MS = 60_000

let lastHealthyAt = 0
let healthCheckInFlight: Promise<void> | null = null

export async function warmContactApi(): Promise<void> {
    const apiUrl = process.env.API_URL
    const apiKey = process.env.API_KEY

    if (!apiUrl || !apiKey) {
        throw new ContactBackendError(500)
    }

    if (Date.now() - lastHealthyAt < API_READY_CACHE_MS) return
    if (healthCheckInFlight) return healthCheckInFlight

    const apiBaseUrl = apiUrl.replace(/\/+$/, '')
    const healthCheck = (async () => {
        const deadline = Date.now() + API_STARTUP_TIMEOUT_MS
        let lastStatus: number | undefined

        while (Date.now() < deadline) {
            const timeout = Math.min(API_HEALTH_CHECK_TIMEOUT_MS, deadline - Date.now())

            try {
                const response = await fetch(`${apiBaseUrl}/health`, {
                    method: 'GET',
                    cache: 'no-store',
                    headers: {
                        Accept: 'application/json',
                        'x-api-key': apiKey,
                    },
                    signal: AbortSignal.timeout(timeout),
                })

                if (response.ok) {
                    lastHealthyAt = Date.now()
                    return
                }

                lastStatus = response.status

                // Client errors indicate a bad health route or credential, not a cold start.
                if (response.status < 500 && response.status !== 429) {
                    throw new ContactBackendError(response.status)
                }
            } catch (error) {
                if (error instanceof ContactBackendError) throw error
            }

            const wait = Math.min(API_HEALTH_RETRY_DELAY_MS, deadline - Date.now())
            if (wait > 0) {
                await new Promise(resolve => setTimeout(resolve, wait))
            }
        }

        throw new ContactBackendError(lastStatus ?? 503)
    })()

    healthCheckInFlight = healthCheck

    try {
        await healthCheck
    } finally {
        if (healthCheckInFlight === healthCheck) {
            healthCheckInFlight = null
        }
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
        await warmContactApi()

        response = await fetch(`${apiUrl.replace(/\/+$/, '')}/contact`, {
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

