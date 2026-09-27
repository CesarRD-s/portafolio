import { SITE_URL } from '@/app/config/site'
import { AboutSection } from '@/app/components/sections/about/AboutSection'
import { ContactSection } from '@/app/components/sections/contact/ContactSection'
import { HeroSection } from '@/app/components/sections/HeroSection'
import { ProjectsSection } from '@/app/components/sections/projects/ProjectsSection'
import { Footer } from '@/app/components/layout/Footer'
import { PortfolioUnavailable } from './PortfolioUnavailable'
import type { PortfolioContent as PortfolioData } from '@/app/lib/portfolio/types'

type Props = {
    portfolio: Promise<PortfolioData | null>
}

export async function PortfolioContent({ portfolio }: Props) {
    let data: PortfolioData | null

    try {
        data = await portfolio
    } catch (error) {
        console.error('No se pudo cargar el contenido público del portafolio:', error)
        return <PortfolioUnavailable />
    }

    if (!data) return <PortfolioUnavailable />

    const sameAs = data.contacts
        .filter(contact => contact.category === 'social' && contact.linkUrl)
        .map(contact => contact.linkUrl)

    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Person',
                name: data.author,
                url: SITE_URL,
                image: `${SITE_URL}/opengraph-image`,
                jobTitle: data.profession,
                description: data.tagLine,
                sameAs,
            },
            {
                '@type': 'WebSite',
                name: `${data.author} - Portafolio`,
                url: SITE_URL,
                description: data.tagLine,
            },
        ],
    }

    const jsonLdString = JSON.stringify(jsonLd).replace(/</g, '\\u003c')

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: jsonLdString }}
            />
            <HeroSection portfolio={data} />
            <ProjectsSection projects={data.projects} />
            <AboutSection portfolio={data} />
            <ContactSection />
            <Footer portfolio={data} />
        </>
    )
}

