import 'server-only'

import { createClient, type SupabaseClient } from '@supabase/supabase-js'

let supabase: SupabaseClient | null = null;

export const getSupabase = (): SupabaseClient => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_KEY

    if (!url || !key) {
        throw new Error('Faltan las variables de entorno de Supabase.')
    }

    if (!supabase) {
        supabase = createClient(url, key, {
            global: {
                fetch: (input, init) => fetch(input, {
                    ...init,
                    signal: init?.signal ?? AbortSignal.timeout(5_000),
                }),
            },
        })
    }

    return supabase;
}
