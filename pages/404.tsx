import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

function Custom404() {
    const router = useRouter()

    useEffect(() => {
        setTimeout(() => router.push('/'), 2000)
    }, [])
    return (
        <section className="bg-primary">
            <div className="grid w-full h-full place-items-center">
                <h1 className="font-mono text-4xl text-white">
                    Error: Page not found! Redirecting...
                </h1>
            </div>
        </section>
    )
}

export default Custom404
