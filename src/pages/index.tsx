import { Head } from '@/components/layout/Head'
import { Form } from '@/components/ui/form/Form'
import { CommunitySuccessPage } from '../components/communitySuccess'
import { useRecoilState } from 'recoil'
import { communityState } from '@/services/community'
import { MainLayout } from '@/components/layout/MainLayout'
import { ToastContainer } from 'react-toastify'

export default function Home() {
  const [community] = useRecoilState(communityState)

  return (
    <>
      <ToastContainer />
      <MainLayout>
        <div className="w-full max-w-2xl p-6">
          <Head />
          {community.name && community.hostname ? (
            <CommunitySuccessPage />
          ) : (
            <div className="">
              <main className="justify-center">
                <h1 className="mt-10 text-center text-4xl font-bold">
                  Create Praise community
                </h1>
                <div className="text-center">
                  There is no question about it. Praise can be one of the
                  simplest ways to make the world a better place. Praise feels
                  good. Let&apos;s do it together.
                </div>
              </main>
              <Form />
            </div>
          )}
        </div>
      </MainLayout>
    </>
  )
}
