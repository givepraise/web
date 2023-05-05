import { ReactNode } from 'react'

interface MainLayoutProps {
  children: ReactNode
}

const MainLayout = (props: MainLayoutProps) => {
  return (
    <div className="mx-4 text-center main-layout md:mt-12">
      <div className="flex flex-col pt-12 mb-16 space-y-16">
        {props.children}
      </div>
    </div>
  )
}

export default MainLayout
