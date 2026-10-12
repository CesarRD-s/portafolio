"use client";

import Link from "next/link";
import { Home, ArrowLeft, SearchX } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NotFound() {
    const router = useRouter()
    return (
        <div className="flex min-h-screen items-center justify-center bg-background px-6 transition-colors">

            <div className="text-center max-w-md">

                {/* Icono */}
                <div className="flex justify-center mb-6">
                    <SearchX className="h-16 w-16 text-brand" />
                </div>

                {/* Código */}
                <h1 className="mb-2 text-6xl font-bold text-foreground">
                    404
                </h1>

                {/* Título */}
                <h2 className="mb-2 text-xl font-semibold text-foreground">
                    Página no encontrada
                </h2>

                {/* Descripción */}
                <p className="mb-6 text-muted">
                    Parece que esta ruta no existe o fue movida.
                    Puedes regresar a la página anterior o volver al inicio.
                </p>

                {/* Botones */}
                <div className="flex justify-center gap-3">

                    <Link
                        href="/"
                        className="flex items-center gap-2 rounded-md bg-brand-strong px-4
                        py-2 text-header-overlay-text shadow-sm transition hover:bg-brand
                        hover:shadow-md"
                    >
                        <Home size={18} />
                        Ir al inicio
                    </Link>

                    <button
                        onClick={() => router.back()}
                        className="flex cursor-pointer items-center gap-2 rounded-md border
                        border-border px-4 py-2 text-foreground transition hover:bg-surface-hover"
                    >
                        <ArrowLeft size={18} />
                        Regresar
                    </button>

                </div>

                {/* Línea decorativa */}
                <div className="mt-8 h-px w-full bg-gradient-to-r from-transparent via-brand/40 to-transparent" />

            </div>
        </div>
    );
}
