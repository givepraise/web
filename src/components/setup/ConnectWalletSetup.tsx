import { ConnectButton } from '@rainbow-me/rainbowkit'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEthereum } from '@fortawesome/free-brands-svg-icons'
import { useAccount } from 'wagmi'

const ConnectWalletSetup = () => {
  const { address } = useAccount()

  return !address ? (
    <>
      <div className="flex justify-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#e6007e] text-white">
          <FontAwesomeIcon icon={faEthereum} />
        </div>
      </div>
      <div className="prose-2xl">
        Praise uses Ethereum for identification, connect wallet to get started
      </div>
      <div className="connectbutton flex h-full items-center justify-center">
        <ConnectButton
          accountStatus="address"
          showBalance={false}
          chainStatus={'none'}
        />
      </div>
    </>
  ) : null
}

export default ConnectWalletSetup
