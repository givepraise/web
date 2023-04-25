import { SignMessageLayout } from '../components/layout/SignMessageLayout'
import { toast } from 'react-toastify'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { generateLinkBotMessage } from '../services/message'

interface LinkBotProps {
  nonce: string
  communityId: string
  guildId: string
}

export default function LinkBot() {
  const [message, setMessage] = useState<string | undefined>(undefined)
  const [communityId, setCommunityId] = useState<string | undefined>(undefined)
  const router = useRouter()
  const { query } = router

  const onSignSuccess = async (signature: any): Promise<void> => {
    try {
      if (!communityId) throw new Error()

      await fetch('/api/link-bot-community', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          signature,
          communityId,
        }),
      }).then((res) => res.json())
    } catch (err) {
      toast.error('Linking bot to community failed')
    }
  }

  useEffect(() => {
    const generateNewMessage = (
      nonce: string,
      communityId: string,
      guildId: string
    ): void => {
      try {
        const newMessage = generateLinkBotMessage(nonce, communityId, guildId)
        setMessage(newMessage)
      } catch (err) {
        toast.error('Error connecting to server')
      }
    }

    const queryParams: LinkBotProps = {
      nonce: query.nonce as string,
      communityId: query.communityId as string,
      guildId: query.guildId as string,
    }

    if (queryParams.nonce && queryParams.communityId && queryParams.guildId) {
      setCommunityId(queryParams.communityId)

      void generateNewMessage(
        queryParams.nonce,
        queryParams.communityId,
        queryParams.guildId
      )
    }
  }, [query])

  return (
    <SignMessageLayout
      onSignSuccess={(signature): void => void onSignSuccess(signature)}
      message={message}
      buttonText="Sign login message">
      <div className="flex w-full justify-center">
        <div>
          <div className="mb-2 text-center text-xl font-semibold">
            Link Praise Discord Bot to Community
          </div>
          <div className="text-center">Cool Community</div>
          <div className="text-center">
            Collect wallet and sign a message to link bot.
          </div>
        </div>
      </div>
    </SignMessageLayout>
  )
}
