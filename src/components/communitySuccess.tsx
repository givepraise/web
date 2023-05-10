import { Button } from './ui/Button'
import { FaCheckCircle } from 'react-icons/fa'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { communityState } from '@/services/community'
import { faPrayingHands } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-hot-toast'
import { useRecoilValue } from 'recoil'

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
        <FaCheckCircle className="text-5xl fa-beat" />
      </div>

      <h2>Community created</h2>
      <div className="flex justify-center py-5">
        <div className="px-3 py-2 bg-white rounded-full bg-opacity-20">
          <FontAwesomeIcon icon={faPrayingHands} size="1x" className="mr-2" />
          {name}name
        </div>
      </div>
      <h2>Next step</h2>
      <p>
        To get started praising, invite the Praise Bot to your Discord server
      </p>

      <a
        href={`https://discord.com/api/oauth2/authorize?client_id=${discordClientId}&permissions=0&scope=bot&guild_id=${guildId}`}>
        <Button>Invite Praise Bot</Button>
      </a>
    </div>
  )
}
