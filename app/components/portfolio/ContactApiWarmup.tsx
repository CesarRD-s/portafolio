'use client'

import { useEffect, useRef } from 'react'

export function ContactApiWarmup() {
    const started = useRef(false)

    useEffect(() => {
        if (started.current) return
        started.current = true

        void fetch('/api/contact/warmup', {
            method: 'GET',
            cache: 'no-store',
        }).catch(() => {
            // The contact form can retry the health check when the visitor submits.
        })
    }, [])

    return null
}
