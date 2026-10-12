'use client'

import Image from 'next/image'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { navLinks } from './config'
import { useScrollSpy } from './hooks/useScrollSpy'
import { HashLink } from '@/app/components/layout/HashLink'

const mobileMenuId = 'mobile-menu'
const mobileMenuTitleId = 'mobile-menu-title'
const logoUrl =
    'https://rekydsbimkpqukrlqkbi.supabase.co/storage/v1/object/public/assets/' +
    'logos/logo-nav.png'

export function Navbar() {
    const [open, setOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const [manualActive, setManualActive] = useState<string>('')
    const burgerRef = useRef<HTMLButtonElement>(null)
    const closeRef = useRef<HTMLButtonElement>(null)
    const prevOpen = useRef(open)

    const sectionIds = useMemo(() => navLinks.map(n => n.id), [])
    const active = useScrollSpy(sectionIds)
    const currentActive = manualActive || active
    const closeMenu = useCallback(() => setOpen(false), [])

    useEffect(() => {
        const updateHeaderState = () => {
            const hero = document.getElementById('home')
            const navbar = document.querySelector('.site-navbar')
            const headerHeight = navbar?.getBoundingClientRect().height ?? 64
            const hasPassedHero = hero
                ? hero.getBoundingClientRect().bottom <= headerHeight
                : window.scrollY > 24

            setIsScrolled(hasPassedHero)
        }

        updateHeaderState()
        window.addEventListener('scroll', updateHeaderState, { passive: true })

        return () => window.removeEventListener('scroll', updateHeaderState)
    }, [])

    useEffect(() => {
        if (!active) return

        const timeout = window.setTimeout(() => {
            setManualActive('')
        }, 0)

        return () => window.clearTimeout(timeout)
    }, [active])

    useEffect(() => {
        const onResize = () => {
            if (window.innerWidth >= 768) setOpen(false)
        }

        window.addEventListener('resize', onResize)
        return () => window.removeEventListener('resize', onResize)
    }, [])

    useEffect(() => {
        if (!open) return

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setOpen(false)
        }

        window.addEventListener('keydown', onKeyDown)
        return () => window.removeEventListener('keydown', onKeyDown)
    }, [open])

    useEffect(() => {
        document.body.style.overflow = open ? 'hidden' : ''
        return () => { document.body.style.overflow = '' }
    }, [open])

    useEffect(() => {
        if (open) {
            closeRef.current?.focus()
        } else if (prevOpen.current) {
            burgerRef.current?.focus()
        }
        prevOpen.current = open
    }, [open])

    return (
        <>
            <nav
                className="site-navbar"
                data-over-hero={isScrolled ? 'false' : 'true'}
            >
                <div
                    className="mx-auto flex h-[var(--header-height)] max-w-7xl items-center
                    justify-between px-5 md:px-8"
                >

                    {/* LOGO */}
                    <HashLink
                        href="#home"
                        onNavigate={setManualActive}
                        className="flex items-center gap-2"
                    >
                        <div className="relative h-10 w-10 shrink-0">
                            <Image
                                src={logoUrl}
                                alt="Logo Developer"
                                fill
                                sizes="36px"
                                className="object-contain"
                            />
                        </div>

                        <span className="text-sm font-semibold tracking-tight text-current">
                            César Reyes
                        </span>
                    </HashLink>

                    {/* DESKTOP */}
                    <ul className="hidden items-center gap-1 md:flex">
                        {navLinks.map(({ id, label, icon: Icon }) => {
                            const isActive = currentActive === id

                            return (
                                <HashLink
                                    key={id}
                                    href={`#${id}`}
                                    onNavigate={setManualActive}
                                    aria-current={isActive ? 'true' : undefined}
                                    data-over-hero={isScrolled ? 'false' : 'true'}
                                    className="site-navbar-link inline-flex items-center gap-2
                                    rounded-full px-5 py-1.5 text-sm font-medium transition-colors
                                    focus-visible:outline-2 focus-visible:outline-offset-2
                                    focus-visible:outline-brand"
                                >
                                    {Icon && <Icon size={18} />}
                                    {label}
                                </HashLink>
                            )
                        })}
                    </ul>

                    {/* MOBILE BUTTON */}
                    <button
                        ref={burgerRef}
                        onClick={() => setOpen(true)}
                        aria-label="Abrir menú"
                        aria-expanded={open}
                        aria-controls={mobileMenuId}
                        className="site-navbar-button cursor-pointer rounded-full p-2
                        transition focus-visible:outline-2 focus-visible:outline-offset-2
                        focus-visible:outline-brand md:hidden"
                        data-over-hero={isScrolled ? 'false' : 'true'}
                    >
                        <Menu size={18} />
                    </button>
                </div>
            </nav>

            {/* OVERLAY */}
            <div
                onClick={() => setOpen(false)}
                aria-hidden="true"
                className={`fixed inset-0 z-40 bg-overlay backdrop-blur-sm transition
                    ${open ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
            />

            {/* MOBILE MENU */}
            <nav
                id={mobileMenuId}
                aria-labelledby={mobileMenuTitleId}
                className={`fixed top-0 left-0 z-50 h-full w-72 transform border-r
                    border-border bg-surface text-foreground backdrop-blur-xl transition
                    ${open ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <div
                    className="flex items-center justify-between border-b border-border p-6"
                >
                    <h2 id={mobileMenuTitleId} className="text-sm font-semibold">Menú</h2>

                    <button
                        ref={closeRef}
                        type="button"
                        onClick={closeMenu}
                        aria-label="Cerrar menú"
                        className="cursor-pointer rounded-full p-2 transition hover:bg-surface-hover"
                    >
                        <X size={18} />
                    </button>
                </div>

                <ul className="flex flex-col gap-2 p-2">
                    {navLinks.map(({ id, label, icon: Icon }) => {
                        const isActive = currentActive === id

                        return (
                            <HashLink
                                key={id}
                                href={`#${id}`}
                                onNavigate={(id) => {
                                    setManualActive(id)
                                    closeMenu()
                                }}
                                aria-current={isActive ? 'true' : undefined}
                                className={`inline-flex items-center rounded-full px-5 py-2.5
                                    text-sm transition focus-visible:outline-2
                                    focus-visible:outline-offset-2 focus-visible:outline-brand
                                    ${isActive ? 'text-brand' : 'hover:bg-surface-hover'}`}
                            >
                                {Icon && <Icon size={18} />}
                                {label}
                            </HashLink>
                        )
                    })}
                </ul>
            </nav>
        </>
    )
}
