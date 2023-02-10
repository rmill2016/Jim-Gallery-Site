/* import '../styles/globals.css' */
import '../styles/styles.css'
import type { AppProps } from 'next/app'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { createClient } from '@supabase/supabase-js'
import { useEffect } from 'react'

export const supabase = createClient(
    process.env.NEXT_PUBLIC_PROJECT_URL,
    process.env.NEXT_PUBLIC_ANON_KEY
)

function MyApp({ Component, pageProps }: AppProps) {
    useEffect(() => {
        const use = async () => {
            ;(await import('tw-elements')).default
        }
        use()
    }, [])
    return (
        <>
            <SessionContextProvider supabaseClient={supabase}>
                <Component {...pageProps} />
            </SessionContextProvider>
        </>
    )
}

export default MyApp
