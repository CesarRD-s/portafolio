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

type Props = {
    portfolio: PortfolioContent
}

export function Footer({ portfolio }: Props) {
    const contactInfo = portfolio.contacts.filter(contact => contact.category === 'direct')
    const socialInfo = portfolio.contacts.filter(contact => contact.category === 'social')

    return (
        <footer className="w-full bg-white/60 dark:bg-neutral-900/60">
            <div className="mx-auto grid max-w-7xl gap-12 px-6 py-10 md:grid-cols-3 md:px-8">
                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                        <div className="relative h-12 w-12">
                            <Image
                                src="https://rekydsbimkpqukrlqkbi.supabase.co/storage/v1/object/public/assets/logos/logo-nav.png"
                                alt="Logo Developer"
                                fill
                                sizes="40px"
                                className="object-contain"
                            />
                        </div>

                        <h3 className="text-lg font-medium tracking-tight text-neutral-900 dark:text-white">
                            César Reyes
                        </h3>
                    </div>

                    <p className="max-w-xs text-sm italic text-neutral-500 dark:text-neutral-400">
                        &quot;La tecnología avanza; cada solución trae un nuevo desafío y una razón para seguir aprendiendo.&quot;
                    </p>

                </div>

                <div className="flex flex-col gap-4">
                    <h4 className="text-sm font-medium tracking-tight text-neutral-900 dark:text-white">
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
                                    <span className="text-neutral-500 dark:text-neutral-400" aria-hidden="true">
                                        {Icon && <Icon size={16} />}
                                    </span>

                                    {href ? (
                                        <Link
                                            href={href}
                                            className="text-neutral-500 transition hover:text-blue-600 dark:text-neutral-400 dark:hover:text-blue-400"
                                        >
                                            {contact.value}
                                        </Link>
                                    ) : (
                                        <span className="text-neutral-500 dark:text-neutral-400">
                                            {contact.value}
                                        </span>
                                    )}
                                </li>
                            )
                        })}
                    </ul>
                </div>

                <div className="flex flex-col gap-4">
                    <h4 className="text-sm font-medium tracking-tight text-neutral-900 dark:text-white">
                        Redes
                    </h4>

                    <ul className="flex flex-col gap-3 text-sm">
                        {socialInfo.map(contact => {
                            const Icon = iconMap[contact.type as keyof typeof iconMap]

                            return (
                                <li key={contact.id} className="flex items-start gap-3">
                                    <span className="text-neutral-500 dark:text-neutral-400" aria-hidden="true">
                                        {Icon && <Icon size={16} />}
                                    </span>

                                    <Link
                                        href={contact.linkUrl || '#'}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-neutral-500 transition hover:text-blue-600 dark:text-neutral-400 dark:hover:text-blue-400"
                                    >
                                        {contact.value}
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </div>

                <p className="text-center text-sm text-neutral-500 dark:text-neutral-400 md:col-span-3">
                    &copy; {portfolio.author} &bull; Portafolio profesional &bull; {portfolio.year}
                </p>
            </div>
        </footer>
    )
}
