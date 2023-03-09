import { ReactNode } from 'react'
import { Footer } from './Footer'
import NoSSR from './NoSSR'
import { Web3Provider } from '@/providers/Web3'

interface MainLayoutProps {
  children: ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <NoSSR>
      <Web3Provider>
        <div className="flex flex-col h-full font-sans">
          <div className="flex items-center justify-center flex-grow">
            {children}
          </div>
          <Footer />
        </div>
      </Web3Provider>
    </NoSSR>
  )
}
