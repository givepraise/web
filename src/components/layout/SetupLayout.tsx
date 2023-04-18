import { ReactNode } from 'react'
import NoSSR from './NoSSR'
import { Web3Provider } from '@/providers/Web3'
import styles from './Layout.module.css'

interface SetupLayoutProps {
  children: ReactNode
}

export function SetupLayout({ children }: SetupLayoutProps) {
  return (
    <NoSSR>
      <Web3Provider>
        <div className={styles.landingContainer}>{children}</div>
      </Web3Provider>
    </NoSSR>
  )
}
