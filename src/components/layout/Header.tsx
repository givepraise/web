import Link from 'next/link'
import { SITE_NAME } from '@/utils/config'
import { SignOutButton } from '../ui/buttons/SignOutButton'
import { ConnectButton } from '@rainbow-me/rainbowkit'

export function Header() {
  return (
    <header className="flex items-center justify-between h-24 px-5 bg-zinc-900">
      <Link href="/">
        <h1 className="text-xl font-semibold transition duration-150 hover:text-gray-400">
          {SITE_NAME}
        </h1>
      </Link>
      <ConnectButton />
      <SignOutButton />
    </header>
  )
}
