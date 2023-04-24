import { faPrayingHands } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import { LoaderSpinner } from '../ui/LoaderSpinner'
import { SignMessageButton } from '../ui/buttons/SignMessageButton'
import { toast } from 'react-toastify'
import { Web3Provider } from '@/providers/Web3'

interface Props {
  children: JSX.Element
  onSignSuccess(signature: string): void
  message?: string
  buttonText?: string
}

export const SignMessageLayout = ({
  children,
  onSignSuccess,
  message = undefined,
  buttonText = 'Sign message',
}: Props): JSX.Element => {
  const { address, isConnected } = useAccount()

  return (
    <Web3Provider>
      <div className="w-full">
        <div className="flex h-screen w-full flex-col">
          <div className="w-full p-5 text-2xl font-bold">
            <FontAwesomeIcon icon={faPrayingHands} size="1x" className="m-2" />
          </div>
          <div className="md:bg-warm-gray-50 m-auto space-y-8 rounded-none border-none bg-none p-8 py-8 shadow-none dark:bg-slate-900 md:rounded-lg md:border md:border-solid md:p-4 md:shadow-sm">
            {children}

            {isConnected && !message ? (
              <LoaderSpinner />
            ) : (
              <ConnectButton
                accountStatus="full"
                showBalance={false}
                chainStatus={'none'}
              />
            )}

            {address && message && (
              <div className="flex w-full items-center justify-center">
                <SignMessageButton
                  text={buttonText}
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
    </Web3Provider>
  )
}
