import { Head } from '@/components/layout/Head'
import { Form } from '@/components/ui/form/Form'
import { CommunitySuccessPage } from '../components/communitySuccess'
import { useRecoilState } from 'recoil'
import { communityState } from '@/services/community'

export default function Home() {
  const [community] = useRecoilState(communityState)

  return (
    <>
      {' '}
      <Head />
      <main>
        <h1 className="mt-10 text-4xl font-bold">Next.js Web3 Starter</h1>
        <h3 className="mt-1 mb-6 text-lg font-medium">
          Powered by General Magic
        </h3>
      </main>
      {community.name && community.hostname ? (
        <CommunitySuccessPage />
      ) : (
        <Form />
      )}
    </>
  )
}
