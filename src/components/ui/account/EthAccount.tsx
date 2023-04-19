import { useAccount } from 'wagmi'
import { faAngleDown, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { classNames, shortenEthAddress } from '@/utils'
import { Jazzicon } from '@ukstv/jazzicon-react'
import { EthAccountDialog } from './EthAccountDialog'

interface EthAccountParams {
  className?: string
  showDownCaret?: boolean
  showRightCaret?: boolean
}

export const EthAccount = ({
  className,
  showDownCaret = true,
  showRightCaret = false,
}: EthAccountParams): JSX.Element | null => {
  const { address } = useAccount()
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)

  if (!address) return null

  return (
    <>
      <div
        className={classNames(
          'flex cursor-pointer items-center justify-between',
          className
        )}
        onClick={(): void => setIsDialogOpen(true)}>
        <div className="flex items-center space-x-2">
          <div className="mb-2 inline-block h-5">
            <Jazzicon address={address} className="h-4 w-4" />
          </div>
          <span>{shortenEthAddress(address)}</span>
        </div>
        <div>
          {showDownCaret && (
            <FontAwesomeIcon icon={faAngleDown} className="ml-1 h-4 w-4" />
          )}
          {showRightCaret && (
            <FontAwesomeIcon icon={faAngleRight} className="ml-1 h-4 w-4" />
          )}
        </div>
      </div>
      <EthAccountDialog
        open={isDialogOpen}
        address={address}
        onClose={(): void => setIsDialogOpen(false)}
      />
    </>
  )
}
