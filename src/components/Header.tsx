import Link from 'next/link'
import { FaGithub, FaDiscord, FaTwitter } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import GetPraiseButton from './landing/GetPraiseButton'

const Header = () => {
  const [isSticky, setIsSticky] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsSticky(true)
      } else {
        setIsSticky(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`${
        isSticky ? 'fixed top-0 left-0 z-50 w-full bg-white shadow-lg' : ''
      }`}>
      <nav className="mx-auto flex items-center px-4 py-4">
        <div className="flex items-center">
          <Link href="/" target="_blank">
            <Image src="/img/icon.png" alt="Your Logo" width={32} height={32} />
          </Link>
        </div>
        <div className="ml-2 hidden items-center space-x-4 md:flex">
          <Link href="/" target="_blank">
            <span className="font-bold text-gray-800 hover:text-pink-600">
              Praise
            </span>
          </Link>
          <Link href="https://givepraise.xyz/docs/" target="_blank">
            <span className="ml-2 text-gray-800 hover:text-pink-600">Docs</span>
          </Link>
          <Link href="https://mirror.xyz/givepraise.eth" target="_blank">
            <span className="ml-2 text-gray-800 hover:text-pink-600">Blog</span>
          </Link>
          <GetPraiseButton />
        </div>
        <div className="headerGroupIcons ml-auto flex items-center space-x-4">
          <Link
            href="https://twitter.com/givepraise"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-800 hover:text-gray-600">
            <FaTwitter className="text-3xl" />
          </Link>
          <Link
            href="https://discord.com/invite/U2ydzXBG6C"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-800 hover:text-gray-600">
            <FaDiscord className="text-3xl" />
          </Link>
          <Link
            href="https://github.com/givepraise/praise"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-800 hover:text-gray-600">
            <FaGithub className="text-3xl" />
          </Link>
        </div>
      </nav>
    </header>
  )
}

export default Header
