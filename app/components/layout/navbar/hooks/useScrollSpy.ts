// useScrollSpy.ts
'use client'

import { useEffect, useState } from 'react'

export function useScrollSpy(ids: string[]) {
    const [active, setActive] = useState<string | null>(null)

    useEffect(() => {
        if (!ids.length) return

        let frame = 0

        const updateActiveSection = () => {
            if (frame) return

            frame = window.requestAnimationFrame(() => {
                frame = 0

                const sections = ids
                    .map(id => document.getElementById(id))
                    .filter((section): section is HTMLElement => Boolean(section))

                if (!sections.length) return

                const scrollPosition = window.scrollY + Math.min(
                    window.innerHeight * 0.35,
                    280
                )
                const isAtPageEnd =
                    window.scrollY + window.innerHeight >=
                    document.documentElement.scrollHeight - 2

                if (isAtPageEnd) {
                    setActive(sections[sections.length - 1].id)
                    return
                }

                const currentSection = sections.reduce((current, section) => {
                    const sectionTop = section.getBoundingClientRect().top +
                        window.scrollY

                    return sectionTop <= scrollPosition ? section : current
                }, sections[0])

                setActive(currentSection.id)
            })
        }

        updateActiveSection()
        window.addEventListener('scroll', updateActiveSection, { passive: true })
        window.addEventListener('resize', updateActiveSection)

        return () => {
            window.removeEventListener('scroll', updateActiveSection)
            window.removeEventListener('resize', updateActiveSection)

            if (frame) window.cancelAnimationFrame(frame)
        }
    }, [ids])

    return active
}
