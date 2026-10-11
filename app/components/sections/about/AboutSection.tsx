import type { PortfolioContent } from '@/app/lib/portfolio/types'
import { Section } from "@/app/components/layout/Section"
import { AboutHeader } from './AboutHeader'
import { AboutCapabilities } from './AboutCapabilities'
import { AboutStack } from './AboutStack'

type Props = {
    portfolio: PortfolioContent
}

export function AboutSection({ portfolio }: Props) {
    return (
        <Section id="about-me">
            <div className="flex flex-col items-center gap-14 md:gap-16">
                <AboutHeader portfolio={portfolio} />
                <AboutCapabilities />
                <AboutStack skills={portfolio.skills} />
            </div>
        </Section>
    )
}
