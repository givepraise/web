import { faLink } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from '../ui/Button'
import Link from 'next/link'

interface SignMessageSuccessProps {
  discordGuildId: string
  name: string
}

const SignMessageSuccess = ({
  discordGuildId,
  name,
}: SignMessageSuccessProps) => {
  return (
    <div className="black-section">
      <FontAwesomeIcon icon={faLink} size="1x" className="m-2" />
      <div className="flex justify-center w-full">
        <div>
          <h2 className="mb-0">Community linked</h2>

          <h5 className="text-center">
            The Praise Discord Bot has been linked to
          </h5>
          <h5 className="mb-12 text-center">{name}.</h5>

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
