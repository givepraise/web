import '@/styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'

import type { AppProps } from 'next/app'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { RecoilRoot } from 'recoil'
import { SessionProvider } from 'next-auth/react'
import { Web3Provider } from '@/providers/Web3'

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <div className="root flex w-full flex-col text-center">
      <div className="bg"></div>
      <RecoilRoot>
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
