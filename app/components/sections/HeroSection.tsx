import { ArrowUp, User as UserIcon } from 'lucide-react'
import { Section } from "@/app/components/layout/Section"
import { HashLink } from "@/app/components/layout/HashLink"
import type { PortfolioContent } from '@/app/lib/portfolio/types'
import Image from 'next/image'

type Props = {
    portfolio: PortfolioContent
}

export function HeroSection({ portfolio }: Props) {
    return (
        <Section id="home">
            <div className="grid gap-12 md:grid-cols-2 items-center">

                {/* LEFT */}
                <div className="flex flex-col gap-6">

                    {/* EYEBROW */}
                    <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                        Portafolio profesional
                    </span>

                    {/* TITLE */}
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-neutral-900 dark:text-white">
                        Hola, soy {portfolio.author}
                    </h1>

                    {/* SUBTITLE */}
                    <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-200">
                        {portfolio.profession || 'Desarrollador de software'}
                    </h2>

                    {/* DESCRIPTION */}
                    <p className="text-base leading-relaxed text-neutral-600 dark:text-neutral-400 max-w-xl">
                        {portfolio.tagLine}
                    </p>

                    {/* CTA */}
                    <div className="flex flex-wrap gap-4 pt-2">

                        {/* PRIMARY */}
                        <HashLink
                            href="#projects"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white font-medium bg-blue-600 hover:bg-blue-600/75 
                            transition"
                        >
                            Ver proyectos
                            <ArrowUp className="rotate-45" />
                        </HashLink>

                        {/* SECONDARY */}
                        <HashLink
                            href="#about-me"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-medium 
                            text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white 
                            bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-800 
                            transition"
                        >
                            Sobre mí
                            <UserIcon />
                        </HashLink>

                    </div>
                </div>

                {/* RIGHT */}
                <div className="flex justify-center md:justify-end relative">
                    <div className="relative w-full h-[200px] md:h-[320px] overflow-hidden">
                        <Image
                            src="https://rekydsbimkpqukrlqkbi.supabase.co/storage/v1/object/public/assets/banners/web-developer.webp"
                            alt="Ilustración de desarrollador web"
                            fill
                            sizes="(max-width: 768px) 200px, 320px"
                            className="object-contain"
                            priority
                        />
                    </div>
                </div>
            </div>
        </Section>
    )
}
