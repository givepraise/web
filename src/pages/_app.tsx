import '@/styles/globals.css'
import '@/styles/landing.css'
import 'react-toastify/dist/ReactToastify.css'
import type { AppProps } from 'next/app'

import { SessionProvider } from 'next-auth/react'
import { RecoilRoot } from 'recoil'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { Web3Provider } from '@/providers/Web3'

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <div className="flex h-screen flex-col font-normal">
      <RecoilRoot>
        <Header />
        <SessionProvider session={session}>
          <Web3Provider>
            <Component {...pageProps} />
          </Web3Provider>
        </SessionProvider>
        <Footer />
      </RecoilRoot>
    </div>
  )
}
