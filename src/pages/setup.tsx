import { Head } from '@/components/layout/Head'
import { CommunitySuccessPage } from '../components/communitySuccess'
import { useRecoilState } from 'recoil'
import { communityState } from '@/services/community'
import { ToastContainer } from 'react-toastify'
import PraiseHands from '@/components/landing/PraiseHands'
import dynamic from 'next/dynamic'
import CircleNumber from '@/components/ui/CircleNumber'
import MainLayout from '@/components/layout/MainLayout'

const DynamicForm = dynamic(() => import('@/components/ui/form/Form'), {
  loading: () => <div className="mt-20 h-[700px] rounded bg-gray-200" />,
  ssr: false,
})

export default function Home() {
  const [community] = useRecoilState(communityState)

  return (
    <MainLayout>
      <ToastContainer />
      <div className="w-full py-6">
        <Head />
        {community.name && community.hostname ? (
          <CommunitySuccessPage />
        ) : (
          <div className="">
            <main className="justify-center">
              <h1 className="mt-10 text-center text-9xl font-normal">
                Get Praise!
              </h1>
              <div className="my-12">
                <PraiseHands />
              </div>
              <div className="px-2 text-center text-xl">
                Start building a culture of giving and gratitude, give your
                community its memory back! Who did{' '}
                <span className="font-bold underline">what</span>,{' '}
                <span className="font-bold underline">when</span> and to{' '}
                <span className="font-bold underline">what</span> impact.
              </div>

              <div className="mt-12 mb-6 flex justify-center">
                <CircleNumber number={1} />
              </div>
              <div className="text-center text-xl">Create Praise community</div>

              <div className="mt-12 mb-6 flex justify-center">
                <CircleNumber number={2} />
              </div>
              <div className="text-center text-xl">
                Invite Discord Bot to your server
              </div>
            </main>

            <DynamicForm />
          </div>
        )}
      </div>
    </MainLayout>
  )
}
