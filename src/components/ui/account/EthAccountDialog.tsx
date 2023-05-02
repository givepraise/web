import {
  faTimes,
  faCopy,
  faArrowRightFromBracket,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Dialog } from '@headlessui/react'
import { Jazzicon } from '@ukstv/jazzicon-react'
import { useDisconnect } from 'wagmi'
import { useRef } from 'react'
import { Box } from '../Box'
import { Button } from '../Button'
import { toast } from 'react-hot-toast'
import { shortenEthAddress } from '@/utils'

interface EthAccountDialogProps {
  open?: boolean
  onClose(): void
  address: string
}

export const EthAccountDialog = ({
  open = false,
  onClose,
  address,
}: EthAccountDialogProps): JSX.Element => {
  const { disconnect } = useDisconnect()
  const contentRef = useRef(null)

  const handleCopyAddress = async (): Promise<void> => {
    await navigator.clipboard.writeText(address)
    toast.success('Copied address')
    onClose()
  }

  const handleDisconnect = (): void => {
    disconnect()
    onClose()
  }

  return (
    <Dialog
      open={open}
      onClose={(): void => onClose()}
      className="fixed inset-0 z-50 overflow-y-auto"
      initialFocus={contentRef}>
      <div className="flex items-center justify-center min-h-screen bg-black/30">
        <Box className="p-10" variant="basic" ref={contentRef}>
          <div className="flex justify-end">
            <Button variant={'round'} onClick={onClose}>
              <FontAwesomeIcon icon={faTimes} size="1x" />
            </Button>
          </div>
          <div>
            <div className="flex justify-center mb-8">
              <Jazzicon address={address} className="w-12 h-12" />
            </div>
            <Dialog.Title className="text-center text-black">
              {shortenEthAddress(address)}
            </Dialog.Title>
            <div className="flex justify-center space-x-4">
              <Button
                className="mt-4"
                onClick={(): void => void handleCopyAddress()}>
                <FontAwesomeIcon className="mr-2" icon={faCopy} size="1x" />
                Copy address
              </Button>
              <Button className="mt-4" onClick={handleDisconnect}>
                <FontAwesomeIcon
                  className="mr-2"
                  icon={faArrowRightFromBracket}
                  size="1x"
                />
                Disconnect
              </Button>
            </div>
          </div>
        </Box>
      </div>
    </Dialog>
  )
}
