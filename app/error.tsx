'use client'

import { useEffect } from 'react'
import { TriangleAlert } from 'lucide-react'

export default function Error({ error, unstable_retry }: {
    error: Error & { digest?: string }
    unstable_retry: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <main className="flex min-h-screen items-center justify-center bg-background px-6">
            <div className="flex flex-col items-center gap-4 max-w-md text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-danger/10 text-danger">
                    <TriangleAlert size={26} />
                </div>

                <h1 className="text-2xl font-semibold text-foreground">
                    Algo salió mal
                </h1>

                <p className="text-sm text-muted">
                    Ocurrió un error inesperado al cargar la página. Puedes intentarlo de nuevo.
                </p>

                <button
                    onClick={() => unstable_retry()}
                    className="rounded-full bg-brand-strong px-5 py-2.5 text-sm
                    font-medium text-header-overlay-text transition hover:bg-brand"
                >
                    Reintentar
                </button>
            </div>
        </main>
    )
}
