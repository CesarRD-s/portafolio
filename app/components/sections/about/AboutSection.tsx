import type { PortfolioContent } from '@/app/lib/portfolio/types'
import { AboutHeader } from './AboutHeader'
import { AboutCapabilities } from './AboutCapabilities'
import { AboutStack } from './AboutStack'

type Props = {
    portfolio: PortfolioContent
}

export function AboutSection({ portfolio }: Props) {
    return (
        <section id="about-me" className="w-full pt-24 md:pt-36">
            <div className="mx-auto max-w-7xl px-6 md:px-8">
                <AboutHeader portfolio={portfolio} />
            </div>

            <div className="mt-24 bg-surface-subtle py-20 md:mt-36 md:py-28">
                <div className="mx-auto max-w-7xl px-6 md:px-8">
                    <AboutCapabilities />
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-6 py-24 md:px-8 md:py-36">
                <AboutStack skills={portfolio.skills} />
            </div>
        </section>
    )
}
