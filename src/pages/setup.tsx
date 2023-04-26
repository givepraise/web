import CircleNumber from '@/components/ui/CircleNumber'
import { CommunitySuccessPage } from '../components/communitySuccess'

import { Head } from '@/components/layout/Head'
import MainLayout from '@/components/layout/MainLayout'
import PraiseHands from '@/components/landing/PraiseHands'
import React from 'react'
import { ToastContainer } from 'react-toastify'
import { communityState } from '@/services/community'
import dynamic from 'next/dynamic'

import { useRecoilState } from 'recoil'

const DynamicForm = dynamic(() => import('@/components/ui/form/Form'), {
  loading: () => <div className="mt-20 h-[700px] rounded bg-gray-200" />,
  ssr: false,
})

const DynamicConnectWalletSetup = dynamic(
  () => import('@/components/setup/ConnectWalletSetup'),
  {
    ssr: false,
  }
)

export default function Home() {
  const [community] = useRecoilState(communityState)

  return (
    <MainLayout>
      <ToastContainer />
      <Head title="SETUP page" />
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
          <DynamicConnectWalletSetup />
          <DynamicForm />
        </>
      )}
    </MainLayout>
  )
}
