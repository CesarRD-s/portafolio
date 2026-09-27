import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import { SITE_DESCRIPTION, SITE_LOCALE, SITE_NAME, SITE_OG_IMAGE, SITE_TITLE, SITE_URL } from './config/site'
import './globals.css'

const firaSans = localFont({
    src: [
        { path: './fonts/FiraSans-Regular.woff2', weight: '400', style: 'normal' },
        { path: './fonts/FiraSans-Medium.woff2', weight: '500', style: 'normal' },
        { path: './fonts/FiraSans-SemiBold.woff2', weight: '600', style: 'normal' },
        { path: './fonts/FiraSans-Bold.woff2', weight: '700', style: 'normal' },
    ],
    variable: '--font-fira-sans',
    display: 'swap',
})

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
        default: SITE_TITLE,
        template: '%s | César Reyes',
    },
    description: SITE_DESCRIPTION,
    applicationName: SITE_NAME,
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    alternates: {
        canonical: '/',
    },
    openGraph: {
        type: 'website',
        url: '/',
        siteName: SITE_NAME,
        locale: SITE_LOCALE,
        title: SITE_TITLE,
        description: SITE_DESCRIPTION,
        images: [
            {
                url: SITE_OG_IMAGE,
                width: 1200,
                height: 630,
                alt: SITE_TITLE,
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: SITE_TITLE,
        description: SITE_DESCRIPTION,
        images: [SITE_OG_IMAGE],
    },
    robots: {
        index: true,
        follow: true,
    },
}
export const viewport: Viewport = {
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: '#f5f5f5' },
        { media: '(prefers-color-scheme: dark)', color: '#171717' },
    ],
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="es" className={firaSans.variable}>
            <body>{children}</body>
        </html>
    )
}
