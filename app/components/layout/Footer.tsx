import Link from 'next/link'
import Image from 'next/image'
import { SiGithub } from 'react-icons/si'
import { FaLinkedin } from 'react-icons/fa6'
import { Mail, Phone } from 'lucide-react'
import type { PortfolioContent } from '@/app/lib/portfolio/types'

const iconMap = {
    email: Mail,
    phone: Phone,
    github: SiGithub,
    linkedin: FaLinkedin,
}

const logoUrl =
    'https://rekydsbimkpqukrlqkbi.supabase.co/storage/v1/object/public/assets/' +
    'logos/logo-nav.png'

type Props = {
    portfolio: PortfolioContent
}

export function Footer({ portfolio }: Props) {
    const contactInfo = portfolio.contacts.filter(contact => contact.category === 'direct')
    const socialInfo = portfolio.contacts.filter(contact => contact.category === 'social')

    return (
        <footer
            className="w-full bg-background"
        >
            <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-[1.2fr_0.8fr_0.8fr] md:px-8 md:py-14">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                        <div className="relative h-9 w-9 shrink-0">
                            <Image
                                src={logoUrl}
                                alt="Logo Developer"
                                fill
                                sizes="36px"
                                className="object-contain"
                            />
                        </div>

                        <h3 className="text-lg font-medium tracking-tight text-foreground">
                            César Reyes
                        </h3>
                    </div>

                    <p
                        className="max-w-sm text-sm italic leading-relaxed
                        text-muted"
                    >
                        &quot;La tecnología avanza; cada solución trae un nuevo desafío y una razón para
                        seguir aprendiendo.&quot;
                    </p>

                </div>

                <div className="flex flex-col gap-4 md:pl-8">
                    <h4
                        className="text-xs font-semibold uppercase tracking-[0.16em]
                        text-soft"
                    >
                        Contacto
                    </h4>

                    <ul className="flex flex-col gap-3 text-sm">
                        {contactInfo.map(contact => {
                            const Icon = iconMap[contact.type as keyof typeof iconMap]
                            const href = contact.type === 'email'
                                ? `mailto:${contact.value}`
                                : contact.type === 'phone'
                                    ? `tel:${contact.value.replace(/\s+/g, '')}`
                                    : undefined

                            return (
                                <li key={contact.id} className="flex items-start gap-3">
                                    <span className="text-soft" aria-hidden="true">
                                        {Icon && <Icon size={16} />}
                                    </span>

                                    {href ? (
                                        <Link
                                            href={href}
                                            className="text-muted transition hover:text-brand"
                                        >
                                            {contact.value}
                                        </Link>
                                    ) : (
                                        <span className="text-muted">
                                            {contact.value}
                                        </span>
                                    )}
                                </li>
                            )
                        })}
                    </ul>
                </div>

                <div className="flex flex-col gap-4 md:pl-8">
                    <h4
                        className="text-xs font-semibold uppercase tracking-[0.16em]
                        text-soft"
                    >
                        Redes
                    </h4>

                    <ul className="flex flex-col gap-3 text-sm">
                        {socialInfo.map(contact => {
                            const Icon = iconMap[contact.type as keyof typeof iconMap]

                            return (
                                <li key={contact.id} className="flex items-start gap-3">
                                    <span className="text-soft" aria-hidden="true">
                                        {Icon && <Icon size={16} />}
                                    </span>

                                    <Link
                                        href={contact.linkUrl || '#'}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-muted transition hover:text-brand"
                                    >
                                        {contact.value}
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </div>

                <p
                    className="pt-2 text-center text-xs text-soft md:col-span-3"
                >
                    &copy; César Reyes &bull; Portafolio profesional &bull; {portfolio.year}
                </p>
            </div>
        </footer>
    )
}
