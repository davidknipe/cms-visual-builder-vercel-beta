import { type PropsWithChildren } from "react"
import type { Metadata } from "next"
import Script from "next/script"
import Head from "next/head"

// Components
import { MoseyBankHeader } from '@/components/header'
import { MoseyBankFooter } from '@/components/footer'
import { ThemeProvider, Body } from '@/components/theme'

// Styling
import { Figtree } from "next/font/google"
import "./globals.scss"

const figtree = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
    description: "An Optimizely demo website",
    keywords: "Mosey bank, Mosey, Optimizely, Demo",
    title: {
        default: "Mosey Bank - An Optimizely Demo",
        template: "%s - An Optimizely Demo"
    }
};

type RootLayoutProps = Readonly<PropsWithChildren<{}>>

export default function RootLayout({ children }: RootLayoutProps) {

    return <html lang="en">
            <Head>
                <Script src="https://cdn.optimizely.com/js/29815861190.js" />
                {/* <Script id="opti-script">{`console.log('Hello world!');`}</Script> */}
            </Head>
            <ThemeProvider value={{ theme: "system" }}>
            <Body className={`${figtree.className} bg-ghost-white text-vulcan dark:bg-vulcan dark:text-ghost-white`}>
                <div className="flex min-h-screen flex-col justify-between">
                    <MoseyBankHeader />
                    {children}
                    <MoseyBankFooter />
                </div>
            </Body>
        </ThemeProvider>
    </html>
}
