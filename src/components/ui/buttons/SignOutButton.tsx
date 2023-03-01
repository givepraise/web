import { guildOptionsState } from '@/services/form'
import { signOut, useSession } from 'next-auth/react'
import { useRecoilState } from 'recoil'

export const SignOutButton = () => {
  const { data: session } = useSession()
  const [guildOptions, setGuildOptions] = useRecoilState(guildOptionsState)

  if (!session) return null

  const handleSignOut = async () => {
    await signOut()
    setGuildOptions([])
  }

  return (
    <button
      className="text-gray-400 transition duration-150 bg-zinc-900 hover:text-gray-300"
      onClick={() => handleSignOut()}>
      Sign out
    </button>
  )
}
