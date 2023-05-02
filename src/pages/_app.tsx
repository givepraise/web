import '@/styles/globals.css'

import type { AppProps } from 'next/app'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { RecoilRoot } from 'recoil'
import { SessionProvider } from 'next-auth/react'
import { Web3Provider } from '@/providers/Web3'
import { Toaster } from 'react-hot-toast'

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <div className="flex flex-col w-full text-center root">
      <div className="bg"></div>
      <RecoilRoot>
        <Header />
        <SessionProvider session={session}>
          <Web3Provider>
            <Component {...pageProps} />
            <Toaster
              position="bottom-right"
              reverseOrder={false}
              toastOptions={{ duration: 3000 }}
            />
          </Web3Provider>
        </SessionProvider>
        <Footer />
      </RecoilRoot>
    </div>
  )
}
