import type { PortfolioContent } from '@/app/lib/portfolio/types'

interface Props {
    portfolio: PortfolioContent
}

export function AboutHeader({ portfolio }: Props) {
    return (
        <div className="w-full max-w-4xl mx-auto flex flex-col items-center text-center gap-6 relative">

            {/* BACKGROUND GLOW */}
            <div className="absolute -top-10 w-72 h-72 bg-blue-500/25 blur-3xl opacity-20 rounded-full pointer-events-none" />

            {/* PROFESSION BADGE */}
            <span className="px-4 py-1.5 text-xs font-medium tracking-wide rounded-full
                bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                {portfolio.profession}
            </span>

            {/* NAME */}
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-neutral-900 dark:text-white">
                {portfolio.author}
            </h2>

            {/* BIO */}
            <p className="max-w-2xl text-base md:text-lg leading-relaxed text-neutral-600 dark:text-neutral-400">
                {portfolio.shortBio}
            </p>

            {/* EXTRA INFO (OPCIONAL PERO RECOMENDADO) */}
            <div className="flex flex-wrap justify-center gap-3 pt-2 text-sm text-neutral-500 dark:text-neutral-400">

                <span className="px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800">
                    Tegucigalpa, Honduras
                </span>

                <span className="px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800">
                    Presencial, Remoto o Híbrido
                </span>

            </div>
        </div>
    )
}
