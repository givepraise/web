import { Head } from '@/components/layout/Head'
import { communityState } from '@/services/community'
import { useRecoilValue } from 'recoil'

export const CommunitySuccessPage = () => {
  const { name, hostname } = useRecoilValue(communityState)

  if (!name || !hostname) return null

  return (
    <>
      <h1 className="mt-10 text-4xl font-bold">Community created</h1>
      <h3 className="mt-1 mb-6 text-lg font-medium">
        Community {name} has been created!
      </h3>
      <a href={hostname}>{hostname}</a>
    </>
  )
}
