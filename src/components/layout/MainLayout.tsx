import { ReactNode } from 'react'
import styles from './Layout.module.css'

interface MainLayoutProps {
  children: ReactNode
}

const MainLayout = (props: MainLayoutProps) => {
  return <div className={styles.landingContainer}>{props.children}</div>
}

export default MainLayout
