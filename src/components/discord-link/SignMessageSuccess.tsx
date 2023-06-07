import { Button } from '../ui/Button'
import { FaCheckCircle } from 'react-icons/fa'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { faPrayingHands } from '@fortawesome/free-solid-svg-icons'
import { ICommunity } from '@/pages/discord-bot/link'

interface SignMessageSuccessProps {
  discordGuildId: string
  community: ICommunity
}

const SignMessageSuccess = ({
  discordGuildId,
  community,
}: SignMessageSuccessProps) => {
  return (
    <div className="black-section">
      <div className="mb-5">
        <FaCheckCircle className="fa-beat text-5xl" />
      </div>
      <div className="flex w-full justify-center">
        <div>
          <h2>Community linked</h2>

          <h5 className="text-center">
            The Praise Discord Bot has been linked to
          </h5>
          <div className="flex justify-center py-5">
            <a
              href={`//${community.hostname}`}
              rel="noreferrer"
              target="_blank">
              <Button className="px-3 py-2">
                <FontAwesomeIcon
                  icon={faPrayingHands}
                  size="1x"
                  className="mr-2"
                />
                {community.name}
              </Button>
            </a>
          </div>

          <h5 className="text-center">
            Now would be a good time to send your first praise, head over to
            Discord and use the command /praise.
          </h5>

          <div className="mt-12">
            <Link
              href={`http://discord.com/channels/${discordGuildId}`}
              target="_blank">
              <Button>Take me there</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignMessageSuccess
