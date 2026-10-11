'use client'

import Image from 'next/image'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { navLinks } from './config'
import { useScrollSpy } from './hooks/useScrollSpy'
import { HashLink } from '@/app/components/layout/HashLink'

const mobileMenuId = 'mobile-menu'
const mobileMenuTitleId = 'mobile-menu-title'

export function Navbar() {
    const [open, setOpen] = useState(false)
    const [manualActive, setManualActive] = useState<string>('')
    const burgerRef = useRef<HTMLButtonElement>(null)
    const closeRef = useRef<HTMLButtonElement>(null)
    const prevOpen = useRef(open)

    const sectionIds = useMemo(() => navLinks.map(n => n.id), [])
    const active = useScrollSpy(sectionIds)
    const currentActive = manualActive || active
    const closeMenu = useCallback(() => setOpen(false), [])

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
            <nav className="border-b border-neutral-300 dark:border-neutral-800 bg-white dark:bg-neutral-900">
                <div className="h-16 mx-auto max-w-7xl px-6 md:px-8 flex items-center justify-between">

                    {/* LOGO */}
                    <HashLink href="#home" onNavigate={setManualActive} className="flex items-center gap-2">
                        <div className="relative w-12 h-12">
                            <Image
                                src="https://rekydsbimkpqukrlqkbi.supabase.co/storage/v1/object/public/assets/logos/logo-nav.png"
                                alt="Logo Developer"
                                fill
                                sizes="40px"
                                className="object-contain"
                            />
                        </div>

                        <span className="font-semibold text-md md:text-lg tracking-tight text-neutral-900 dark:text-white">
                            César Reyes
                        </span>
                    </HashLink>

                    {/* DESKTOP */}
                    <ul className="hidden md:flex items-center gap-2">
                        {navLinks.map(({ id, label, icon: Icon }) => {
                            const isActive = currentActive === id

                            return (
                                <HashLink
                                    key={id}
                                    href={`#${id}`}
                                    onNavigate={setManualActive}
                                    aria-current={isActive ? 'true' : undefined}
                                    className={`inline-flex items-center px-5 py-2 rounded-full text-sm transition-all duration-200 
                                        ${isActive
                                            ? 'text-blue-500 hover:bg-blue-500/25'
                                            : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'}`}
                                >
                                    {Icon && <Icon size={18} className="mr-2" />}
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
                        className="md:hidden p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
                    >
                        <Menu size={18} />
                    </button>
                </div>
            </nav>

            {/* OVERLAY */}
            <div
                onClick={() => setOpen(false)}
                aria-hidden="true"
                className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition 
                    ${open ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
            />

            {/* MOBILE MENU */}
            <nav
                id={mobileMenuId}
                aria-labelledby={mobileMenuTitleId}
                className={`fixed top-0 left-0 h-full w-72 bg-white/95 dark:bg-neutral-900/95 z-50 border-r 
                    border-neutral-200 dark:border-neutral-800 transform transition 
                    ${open ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <div className="flex items-center justify-between p-6 border-b border-neutral-300 dark:border-neutral-800">
                    <h2 id={mobileMenuTitleId} className="text-sm font-semibold">Menú</h2>

                    <button
                        ref={closeRef}
                        type="button"
                        onClick={closeMenu}
                        aria-label="Cerrar menú"
                        className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
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
                                className={`inline-flex items-center px-5 py-3 rounded-full text-sm transition 
                                    ${isActive
                                        ? 'text-blue-500'
                                        : 'hover:bg-neutral-200 dark:hover:bg-neutral-800'}`}
                            >
                                {Icon && <Icon size={18} className="mr-2" />}
                                {label}
                            </HashLink>
                        )
                    })}
                </ul>
            </nav>
        </>
    )
}
