import React from 'react'
import Head from 'next/head'
import Header from '../components/Header'

type Props = {
    title?: string
    children: React.ReactNode
}

function Layout({ title = "Jim's Gallery Site", children }: Props) {
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0,minimum-scale=1.0"
                />
            </Head>
            <Header />
            {children}
        </>
    )
}

export default Layout
