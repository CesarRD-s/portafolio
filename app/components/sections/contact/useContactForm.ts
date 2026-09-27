'use client'

import { useState } from "react";
import type { ContactPayload } from '@/app/lib/contact/types'

type Status = 'idle' | 'sending' | 'slow' | 'success' | 'error'

export function useContactForm() {
    const [status, setStatus] = useState<Status>('idle')
    const [error, setError] = useState<string | null>(null)

    const send = async (payload: ContactPayload): Promise<boolean> => {
        setStatus('sending')
        setError(null)

        const slowTimer = setTimeout(() => {
            setStatus(prev => (prev === 'sending' ? 'slow' : prev))
        }, 3000)

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const result = await response.json().catch(() => null) as { message?: string } | null
                setError(result?.message ?? 'Parece que algo ha salido mal. Por favor, intenta nuevamente.')
                setStatus('error')
                clearTimeout(slowTimer)
                return false
            }

            clearTimeout(slowTimer)
            setStatus('success')
            return true

        } catch {
            clearTimeout(slowTimer)
            setError('Parece que algo ha salido mal. Por favor, intenta nuevamente.')
            setStatus('error')
            return false
        }
    }

    return { status, setStatus, error, send }
}
