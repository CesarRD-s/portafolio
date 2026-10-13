import { warmContactApi } from '@/app/lib/contact/server'

export async function GET() {
    try {
        await warmContactApi()

        return new Response(null, {
            status: 204,
            headers: { 'Cache-Control': 'no-store' },
        })
    } catch {
        return Response.json(
            { ready: false },
            {
                status: 502,
                headers: { 'Cache-Control': 'no-store' },
            },
        )
    }
}
