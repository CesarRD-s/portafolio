import Link from 'next/link'

export function PortfolioUnavailable() {
    return (
        <section
            aria-labelledby="portfolio-unavailable-title"
            className="min-h-[60vh] flex items-center justify-center px-6 py-24"
        >
            <div className="max-w-md text-center">
                <h1
                    id="portfolio-unavailable-title"
                    className="text-2xl font-semibold text-foreground"
                >
                    El portafolio está tomando un descanso
                </h1>
                <p className="mt-3 text-muted">
                    No pudimos cargar el contenido en este momento. Intenta actualizar la página en unos segundos.
                </p>
                <Link
                    href="/"
                    className="mt-6 inline-flex rounded-full bg-brand-strong px-5 py-2.5
                    text-sm font-medium text-header-overlay-text transition
                    hover:bg-brand"
                >
                    Intentar de nuevo
                </Link>
            </div>
        </section>
    )
}

