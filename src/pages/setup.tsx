import { Head } from '@/components/layout/Head'
import { Form } from '@/components/ui/form/Form'
import { CommunitySuccessPage } from '../components/communitySuccess'
import { useRecoilState } from 'recoil'
import { communityState } from '@/services/community'
import { SetupLayout } from '@/components/layout/SetupLayout'
import { ToastContainer } from 'react-toastify'
import PraiseHands from '@/components/landing/PraiseHands'
import CircleNumber from '@/components/ui/CircleNumber'

export default function Home() {
  const [community] = useRecoilState(communityState)

  return (
    <>
      <ToastContainer />
      <SetupLayout>
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
                <div className="text-center text-xl">
                  Create Praise community
                </div>

                <div className="mt-12 mb-6 flex justify-center">
                  <CircleNumber number={2} />
                </div>
                <div className="text-center text-xl">
                  Invite Discord Bot to your server
                </div>
              </main>

              <Form />
            </div>
          )}
        </div>
      </SetupLayout>
    </>
  )
}
