import CircleNumber from '@/components/ui/CircleNumber'
import { CommunitySuccessPage } from '../components/communitySuccess'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Head } from '@/components/layout/Head'
import MainLayout from '@/components/layout/MainLayout'
import PraiseHands from '@/components/landing/PraiseHands'
import React from 'react'
import { ToastContainer } from 'react-toastify'
import { communityState } from '@/services/community'
import dynamic from 'next/dynamic'
import { faEthereum } from '@fortawesome/free-brands-svg-icons'
import { useAccount } from 'wagmi'
import { useRecoilState } from 'recoil'

const DynamicForm = dynamic(() => import('@/components/ui/form/Form'), {
  loading: () => <div className="mt-20 h-[700px] rounded bg-gray-200" />,
  ssr: false,
})

export default function Home() {
  const [community] = useRecoilState(communityState)
  const { address } = useAccount()
  const [showConnect, setShowConnect] = React.useState(false)

  React.useEffect(() => {
    setShowConnect(!address)
  }, [address])

  return (
    <MainLayout>
      <ToastContainer />
      <Head />
      {community.name && community.hostname ? (
        <CommunitySuccessPage />
      ) : (
        <>
          <h1>
            Start building a culture of giving and gratitude, give your
            community its memory back! Who did{' '}
            <span className="font-bold underline">what</span>,{' '}
            <span className="font-bold underline">when</span> and to{' '}
            <span className="font-bold underline">what</span> impact.
          </h1>
          <PraiseHands />
          <div className="prose-2xl">
            Setting up Praise is a two step process in less than 5 minutes!
          </div>

          <div className="flex justify-center">
            <CircleNumber number={1} />
          </div>
          <div className="prose-2xl">Create Praise community</div>

          <div className="flex justify-center">
            <CircleNumber number={2} />
          </div>
          <div className="prose-2xl">Invite Discord Bot to your server</div>

          {showConnect && (
            <>
              <div className="flex justify-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#e6007e] text-white">
                  <FontAwesomeIcon icon={faEthereum} />
                </div>
              </div>
              <div className="prose-2xl">
                Praise uses Ethereum for identification, connect wallet to get
                started
              </div>
              <div className="connectbutton flex h-full items-center justify-center">
                <ConnectButton
                  accountStatus="address"
                  showBalance={false}
                  chainStatus={'none'}
                />
              </div>
            </>
          )}

          <DynamicForm />
        </>
      )}
    </MainLayout>
  )
}
