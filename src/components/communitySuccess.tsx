import { communityState } from '@/services/community'
import { useRecoilValue } from 'recoil'
import { Button } from './ui/Button'
import { FaCheckCircle } from 'react-icons/fa'
import { toast } from 'react-hot-toast'

export const CommunitySuccessPage = () => {
  const { name, hostname, guildId } = useRecoilValue(communityState)
  const discordClientId = process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID

  if (!discordClientId) {
    toast.error(`Missing environment variable NEXT_PUBLIC_DISCORD_CLIENT_ID`)
    return null
  }

  if (!name || !hostname) return null

  return (
    <div className="black-section">
      <div className="mb-8">
        <FaCheckCircle className="text-5xl" />
      </div>

      <h2>Community created</h2>
      <p className="mt-8">{name}</p>
      <h2>Next step</h2>
      <p>
        To get started praising, invite the Praise Bot to your Discord server
      </p>

      <a
        href={`https://discord.com/api/oauth2/authorize?client_id=${discordClientId}&permissions=0&scope=bot&guild_id=${guildId}`}>
        <Button className="button button--secondary button--lg mt-12">
          Invite Praise Bot
        </Button>
      </a>
    </div>
  )
}
