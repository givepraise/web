import { ReactNode } from 'react'
import NoSSR from './NoSSR'
import { Web3Provider } from '@/providers/Web3'

interface SetupLayoutProps {
  children: ReactNode
}

export function SetupLayout({ children }: SetupLayoutProps) {
  return (
    <NoSSR>
      <Web3Provider>
        <div className="flex h-full flex-col font-sans">
          <div className="flex flex-grow items-center justify-center">
            {children}
          </div>
        </div>
      </Web3Provider>
    </NoSSR>
  )
}
