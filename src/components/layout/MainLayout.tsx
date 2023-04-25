import { ReactNode } from 'react'

interface MainLayoutProps {
  children: ReactNode
}

const MainLayout = (props: MainLayoutProps) => {
  return (
    <div className="main-layout mx-4 text-center md:mt-12">
      <div className="mb-16 flex flex-col space-y-16 pt-12">
        {props.children}
      </div>
    </div>
  )
}

export default MainLayout
