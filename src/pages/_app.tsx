import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { MainLayout } from '@/components/layout/MainLayout'
import { Seo } from '@/components/layout/Seo'
import { SessionProvider } from 'next-auth/react'
import { RecoilRoot } from 'recoil'
import { Web3Provider } from '@/providers/Web3'

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <RecoilRoot>
      <Seo />
      <Web3Provider>
        <SessionProvider session={session}>
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        </SessionProvider>
      </Web3Provider>
    </RecoilRoot>
  )
}
