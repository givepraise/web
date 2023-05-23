import { faLink, faPrayingHands } from '@fortawesome/free-solid-svg-icons'
import { useAccount, useSignMessage } from 'wagmi'
import { useEffect, useState } from 'react'

import { ConnectButton } from '@rainbow-me/rainbowkit'
import { EthAccount } from '@/components/ui/account/EthAccount'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Head } from '@/components/layout/Head'
import { LoaderSpinner } from '@/components/ui/LoaderSpinner'
import MainLayout from '@/components/layout/MainLayout'
import PraiseHands from '@/components/landing/PraiseHands'
import { SignMessageButton } from '@/components/ui/buttons/SignMessageButton'
import SignMessageSuccess from '@/components/discord-link/SignMessageSuccess'
import { generateLinkBotMessage } from '../../services/message'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/router'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

interface LinkBotProps {
  nonce: string
  communityId: string
  guildId: string
}

export interface ICommunity {
  name: string
  hostname: string
  email: string
  discordGuildId: string
}

export default function LinkBot() {
  const { address } = useAccount()
  const [message, setMessage] = useState<string | undefined>(undefined)
  const [communityId, setCommunityId] = useState<string | undefined>(undefined)
  const [guildId, setGuildId] = useState<string | undefined>(undefined)
  const [linkSuccess, setLinkSuccess] = useState<boolean>(false)
  const router = useRouter()
  const { query } = router
  const [isAddressAvailable, setIsAddressAvailable] = useState<boolean>(false)
  const [community, setCommunity] = useState<ICommunity>({
    name: '',
    hostname: '',
    email: '',
    discordGuildId: '',
  })
  const [communityLoaded, setCommunityLoaded] = useState<boolean>(false)

  const { isLoading, isSuccess } = useSignMessage({
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

      const response = await fetch('/api/link-bot-community', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          signedMessage: signature,
          communityId,
        }),
      }).then((res) => res.json())

      if (
        response.error &&
        response.message &&
        (response.statusCode === 400 ||
          response.statusCode === 404 ||
          response.statusCode === 403)
      ) {
        toast.error(response.message)
      } else {
        setLinkSuccess(true)
      }
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

    const getCommunity = async (communityId: string): Promise<void> => {
      try {
        const response = await fetch(
          `/api/fetch-community?communityId=${communityId}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        ).then((res) => res.json())

        if (response.error && response.message) {
          setCommunityLoaded(false)
          toast.error(`Error getting community: ${response.message}`)
        } else {
          setCommunity(response)
          setCommunityLoaded(true)
        }
      } catch (err) {
        setCommunityLoaded(false)
        toast.error('Error getting community')
      }
    }

    const queryParams: LinkBotProps = {
      nonce: query.nonce as string,
      communityId: query.communityId as string,
      guildId: query.guildId as string,
    }

    if (queryParams.nonce && queryParams.communityId && queryParams.guildId) {
      setCommunityId(queryParams.communityId)
      setGuildId(queryParams.guildId)

      void generateNewMessage(
        queryParams.nonce,
        queryParams.communityId,
        queryParams.guildId
      )

      void getCommunity(queryParams.communityId)
    }
  }, [query])

  useEffect(() => {
    const addressBool = address ? true : false
    setIsAddressAvailable(addressBool)
  }, [address])

  return (
    <MainLayout>
      <Head title="Link Discord Bot | Praise" />
      <h1 className="!mb-0">One final step before you can start praising!</h1>
      <PraiseHands />
      {query.nonce && query.communityId && query.guildId ? (
        <>
          {!linkSuccess ? (
            <div className="black-section">
              <FontAwesomeIcon icon={faLink} size="1x" className="m-2" />
              <h2>Link Discord Bot</h2>
              <div className="flex w-full justify-center">
                <div>
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
                    disabled={!communityLoaded}
                  />
                </div>
              )}
            </div>
          ) : (
            <SignMessageSuccess
              name={community.name}
              discordGuildId={community.discordGuildId}
            />
          )}
        </>
      ) : (
        <div className="black-section">Invalid query string.</div>
      )}
    </MainLayout>
  )
}
