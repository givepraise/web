import { communityState } from '@/services/community'
import { toast } from 'react-toastify'
import { useRecoilValue } from 'recoil'

export const CommunitySuccessPage = () => {
  const { name, hostname, guildId } = useRecoilValue(communityState)
  const discordClientId = process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID

  if (!discordClientId) {
    toast.error(`Missing environment variable DISCORD_CLIENT_ID`)
    return null
  }

  if (!name || !hostname) return null

  return (
    <>
      <h1 className="mt-10 text-4xl font-bold">Community created</h1>
      <h3 className="mb-6 mt-1 text-lg font-medium">
        Community {name} has been created!
      </h3>
      <a href={hostname}>{hostname}</a>
      <h3>DISCORD</h3>
      <p>
        To get started praising, invite the Praise Bot to your Discord server
      </p>

      <a
        href={`https://discord.com/api/oauth2/authorize?client_id=${discordClientId}&permissions=0&scope=bot&guild_id=${guildId}`}
        className='className="rounded-md focus-visible:ring-opacity-75" bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-white'>
        Invite
      </a>
    </>
  )
}
