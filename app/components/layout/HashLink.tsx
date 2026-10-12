'use client'

import type {
    AnchorHTMLAttributes,
    MouseEvent,
} from 'react'

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
    href: string
    onNavigate?: (id: string) => void
}

export function HashLink({
    href,
    children,
    onClick,
    onNavigate,
    ...anchorProps
}: Props) {
    const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
        onClick?.(e)

        if (
            e.defaultPrevented ||
            e.button !== 0 ||
            e.metaKey ||
            e.ctrlKey ||
            e.shiftKey ||
            e.altKey ||
            (anchorProps.target && anchorProps.target !== '_self')
        ) {
            return
        }

        const id = href.replace('#', '')
        const el = document.getElementById(id)
        if (!el) return

        e.preventDefault()

        el.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        })

        window.history.replaceState(null, '', href)
        onNavigate?.(id)
    }

    return (
        <a
            {...anchorProps}
            href={href}
            onClick={handleClick}
        >
            {children}
        </a>
    )
}
