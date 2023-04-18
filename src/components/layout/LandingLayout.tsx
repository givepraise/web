import { ReactNode } from 'react'
import styles from './Layout.module.css'

interface LandingLayoutProps {
  children: ReactNode
}

const LandingLayout = (props: LandingLayoutProps) => {
  return <div className={styles.landingContainer}>{props.children}</div>
}

export default LandingLayout
