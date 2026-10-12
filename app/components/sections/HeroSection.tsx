import { ArrowDownRight, ArrowUpRight, MapPin } from 'lucide-react'
import Image from 'next/image'
import { HashLink } from '@/app/components/layout/HashLink'
import type { PortfolioContent } from '@/app/lib/portfolio/types'

type Props = {
    portfolio: PortfolioContent
}

const bannerUrl =
    'https://rekydsbimkpqukrlqkbi.supabase.co/storage/v1/object/public/assets/banners/' +
    'banner-programador-c04cb982-221c-4282-ae02-bdd0fabd19b9.jpg'

export function HeroSection({ portfolio }: Props) {
    return (
        <section
            id="home"
            className="hero-section relative isolate flex items-center
            justify-center overflow-hidden px-6 py-24"
        >
            <Image
                src={bannerUrl}
                alt="Espacio de trabajo con código abierto en varias pantallas"
                fill
                sizes="100vw"
                className="absolute inset-0 -z-20 object-cover object-[center_48%]"
                priority
            />

            <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 hero-shade"
            />
            <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 hero-gradient"
            />
            <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 hero-glow"
            />

            <div
                className="mx-auto w-full max-w-5xl text-center
                text-header-overlay-text"
            >
                <p
                    className="mb-6 text-xs font-semibold uppercase tracking-[0.2em]
                    text-header-overlay-text/80"
                >
                    Portafolio profesional
                </p>

                <p className="mb-3 text-base font-medium text-header-overlay-text/80 sm:text-lg">
                    {portfolio.author}
                </p>

                <h1
                    className="mx-auto max-w-5xl text-4xl font-semibold leading-[1.08]
                    tracking-tight sm:text-6xl lg:text-7xl"
                >
                    {portfolio.profession || 'Desarrollador de software'}
                </h1>

                <p
                    className="mx-auto mt-6 max-w-3xl text-base leading-relaxed
                    text-header-overlay-text/80 sm:text-lg md:text-xl"
                >
                    {portfolio.tagLine}
                </p>

                <div className="mt-9 flex flex-wrap justify-center gap-3">
                    <HashLink
                        href="#projects"
                        className="group inline-flex min-h-10 items-center gap-2 rounded-full
                        bg-brand-strong px-6 py-2 text-sm font-semibold
                        text-header-overlay-text transition hover:bg-brand
                        focus-visible:outline-header-overlay-text"
                    >
                        Ver proyectos
                        <ArrowUpRight
                            className="h-4 w-4 transition-transform group-hover:translate-x-0.5
                            group-hover:-translate-y-0.5"
                        />
                    </HashLink>

                    <HashLink
                        href="#contact"
                        className="inline-flex min-h-10 items-center gap-2 rounded-full
                        border border-header-overlay-text/35 px-6 py-2 text-sm
                        font-semibold text-header-overlay-text transition
                        hover:border-header-overlay-text hover:bg-header-overlay-text/10
                        focus-visible:outline-header-overlay-text"
                    >
                        Contactarme
                        <ArrowDownRight className="h-4 w-4" />
                    </HashLink>
                </div>

                <p
                    className="mt-8 inline-flex items-center gap-2 text-sm
                    text-header-overlay-text/70"
                >
                    <MapPin
                        className="h-4 w-4 text-header-overlay-text/80"
                        aria-hidden="true"
                    />
                    Tegucigalpa, Honduras
                </p>
            </div>
        </section>
    )
}
