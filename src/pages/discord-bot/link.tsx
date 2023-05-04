import { SignMessageLayout } from '../../components/layout/SignMessageLayout'
import { toast } from 'react-hot-toast'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { generateLinkBotMessage } from '../../services/message'
import MainLayout from '@/components/layout/MainLayout'
import { Head } from '@/components/layout/Head'
import { faLink, faPrayingHands } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Web3Provider } from '@/providers/Web3'
import { useAccount, useSignMessage } from 'wagmi'
import { LoaderSpinner } from '@/components/ui/LoaderSpinner'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { SignMessageButton } from '@/components/ui/buttons/SignMessageButton'
import { EthAccount } from '@/components/ui/account/EthAccount'
import PraiseHands from '@/components/landing/PraiseHands'

interface LinkBotProps {
  nonce: string
  communityId: string
  guildId: string
}

export default function LinkBot() {
  const { address, isConnected } = useAccount()

  const [message, setMessage] = useState<string | undefined>(undefined)
  const [communityId, setCommunityId] = useState<string | undefined>(undefined)
  const router = useRouter()
  const { query } = router
  const [isAddressAvailable, setIsAddressAvailable] = useState<boolean>(false)

  const { isLoading, isSuccess, signMessage } = useSignMessage({
    message,
    onError() {
      toast.error('Error signing message')
    },
    onSuccess(data) {
      onSignSuccess(data)
    },
  })

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
      console.log('ERROR:', err)
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

  useEffect(() => {
    const addressBool = address ? true : false
    setIsAddressAvailable(addressBool)
  }, [address])

  return (
    <MainLayout>
      <Head title="Link Discord Bot | Praise" />

      <div className="w-full">
        <div className="text-3xl">
          <h1>One final step before you can start praising!</h1>
        </div>
        <div className="flex w-full flex-col">
          <div className="w-full p-5 text-2xl font-bold">
            <PraiseHands />
          </div>
          <div className="black-section">
            <FontAwesomeIcon icon={faLink} size="1x" className="m-2" />
            <div className="flex w-full justify-center">
              <div>
                <h2 className="mb-0">Link Praise Discord Bot to </h2>
                <h2 className="mt-0">Cool Community</h2>

                <p className="text-center">
                  Sign a message with your wallet to secure the connection
                  between the bot and the newly setup community.
                </p>
              </div>
            </div>

            <div className="flex justify-center">
              {isAddressAvailable ? (
                <EthAccount className="w-36" />
              ) : (
                <ConnectButton
                  accountStatus="full"
                  showBalance={false}
                  chainStatus={'none'}
                />
              )}
            </div>

            {isAddressAvailable && message && (
              <div className="mt-12">
                <SignMessageButton
                  text="Sign Message"
                  message={message}
                  onSignSuccess={onSignSuccess}
                  onSignError={(): void =>
                    void toast.error('Linking bot denied')
                  }
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
