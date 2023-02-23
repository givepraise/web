import { signOut, useSession } from 'next-auth/react'

export const SignOutButton = () => {
  const { data: session } = useSession()

  if (!session) return null

  return (
    <button
      className="bg-zinc-900 text-gray-400 transition duration-150 hover:text-gray-300"
      onClick={() => signOut()}>
      Sign out
    </button>
  )
}
