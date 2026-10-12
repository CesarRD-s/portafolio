import { MapPin } from 'lucide-react'
import type { PortfolioContent } from '@/app/lib/portfolio/types'

interface Props {
    portfolio: PortfolioContent
}

export function AboutHeader({ portfolio }: Props) {
    return (
        <div
            className="grid w-full gap-12 md:grid-cols-[0.9fr_1.1fr] md:gap-20
            lg:gap-28"
        >
            <div className="md:pt-3">
                <h2
                    className="max-w-xl text-5xl font-semibold leading-[1.02]
                    tracking-tight text-foreground sm:text-6xl lg:text-7xl"
                >
                    {portfolio.author}
                </h2>
                <p className="mt-6 max-w-lg text-lg font-medium leading-relaxed text-brand
                    sm:text-xl">
                    {portfolio.profession}
                </p>
            </div>

            <div className="max-w-3xl md:pt-8">
                <p
                    className="text-xl leading-relaxed text-foreground sm:text-2xl
                    sm:leading-relaxed"
                >
                    {portfolio.shortBio}
                </p>

                <div
                    className="mt-12 flex flex-wrap gap-x-8 gap-y-4 text-sm text-muted"
                >
                    <span className="inline-flex items-center gap-2">
                        <MapPin
                            className="h-4 w-4 text-brand"
                            aria-hidden="true"
                        />
                        Tegucigalpa, Honduras
                    </span>
                    <span>Presencial · Remoto · Híbrido</span>
                </div>
            </div>
        </div>
    )
}
