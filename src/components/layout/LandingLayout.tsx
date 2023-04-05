import { ReactNode } from 'react'
import { Seo } from './Seo'
import styles from './LandingLayout.module.css'

interface LandingLayoutProps {
  children: ReactNode
}

const LandingLayout = (props: LandingLayoutProps) => {
  return <div className={styles.landingContainer}>{props.children}</div>
}

export default LandingLayout
