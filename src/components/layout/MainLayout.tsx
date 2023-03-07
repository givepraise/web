import { ReactNode } from 'react'
import { Footer } from './Footer'
import { Header } from './Header'
import NoSSR from './NoSSR'

interface MainLayoutProps {
  children: ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <NoSSR>
      <div className="min-h-screen bg-zinc-800 text-white">
        <Header />
        <div className="mx-auto min-h-screen-content max-w-7xl p-8">
          {children}
        </div>
        <Footer />
      </div>
    </NoSSR>
  )
}
