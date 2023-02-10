import React, { useState } from 'react'
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import Intro from '../components/Intro'
import Gallery from '../components/Gallery'
import Contribute from '../components/Contribute'

export const CDNURL: string =
    process.env.NEXT_PUBLIC_PROJECT_URL +
    '/storage/v1/object/public/data/images/'

export default function Home() {
    return (
        <Layout>
            <Hero />
            <Intro />
            <Gallery />
            <Contribute />
        </Layout>
    )
}
