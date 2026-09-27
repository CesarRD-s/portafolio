import { ImageResponse } from 'next/og'
import { SITE_AUTHOR, SITE_DESCRIPTION, SITE_ROLE, SITE_TITLE } from './config/site'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = SITE_TITLE

export default function OgImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    padding: '80px',
                    background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
                    color: '#ffffff',
                    fontFamily: 'sans-serif',
                }}
            >
                <div style={{ fontSize: '76px', fontWeight: 800, letterSpacing: '-2px' }}>
                    {SITE_AUTHOR}
                </div>
                <div style={{ fontSize: '40px', marginTop: '20px', color: '#3b82f6', fontWeight: 600 }}>
                    {SITE_ROLE}
                </div>
                <div style={{ fontSize: '26px', marginTop: '48px', color: '#a3a3a3' }}>
                    {SITE_DESCRIPTION}
                </div>
            </div>
        ),
        size
    )
}
