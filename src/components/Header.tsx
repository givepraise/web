import { FaBars, FaDiscord, FaGithub, FaTwitter } from 'react-icons/fa'
import { useEffect, useState } from 'react'

import { Button } from './ui/Button'
import CloseButton from './ui/CloseButton'
import Image from 'next/image'
import Link from 'next/link'

const Header = () => {
  const [isSticky, setIsSticky] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

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

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
  }, [isMenuOpen])

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header
      className={`${isSticky ? 'fixed left-0 top-0 z-50 w-full ' : 'z-10'}`}>
      <nav className="mx-auto flex items-center px-4 py-4">
        <button
          className="ml-2 text-gray-800 hover:text-pink-600 sm:hidden"
          onClick={handleMenuToggle}>
          <FaBars className="text-2xl" />
        </button>
        <div className="ml-2 flex items-center">
          <Link href="/">
            <Image src="/img/icon.png" alt="Your Logo" width={32} height={32} />
          </Link>
        </div>

        {/* Big screens menu items */}
        <div className="ml-2 hidden items-center space-x-4 sm:flex">
          <Link href="/">
            <span className="font-bold text-gray-800 hover:text-pink-600">
              Praise
            </span>
          </Link>
          <Link href="https://docs.givepraise.xyz" target="_blank">
            <span className="ml-2 text-gray-800 hover:text-pink-600">Docs</span>
          </Link>
          <Link href="https://mirror.xyz/givepraise.eth" target="_blank">
            <span className="ml-2 text-gray-800 hover:text-pink-600">Blog</span>
          </Link>
          <Button onClick={() => (window.location.href = '/waitlist')}>
            Get Praise!
          </Button>
        </div>

        {/* Small screens menu items */}
        <div
          className={`${
            isMenuOpen ? 'flex' : 'hidden'
          } fixed inset-0 z-50 justify-center bg-white`}
          style={{ overflowY: isMenuOpen ? 'auto' : 'hidden' }}>
          <div className="absolute left-4 top-2 flex">
            <div className="mt-2">
              <Link href="/" onClick={handleMenuToggle}>
                <Image src="/img/icon.png" alt="Logo" width={32} height={32} />
              </Link>
            </div>
            <div className="mt-2.5">
              <Link href="/">
                <span className="ml-2 mt-4 font-bold text-gray-800 hover:text-pink-600">
                  Praise
                </span>
              </Link>
            </div>
          </div>
          <div className="mt-12 flex h-full">
            <CloseButton onClick={handleMenuToggle} />
            <div className="mt-8 flex flex-col space-y-8 text-5xl">
              <div className="flex justify-center">
                <Link
                  href="https://givepraise.xyz/docs/"
                  target="_blank"
                  onClick={handleMenuToggle}>
                  <span className="text-gray-800 hover:text-pink-600">
                    Docs
                  </span>
                </Link>
              </div>
              <div className="flex justify-center">
                <Link
                  href="https://mirror.xyz/givepraise.eth"
                  target="_blank"
                  onClick={handleMenuToggle}>
                  <span className="text-gray-800 hover:text-pink-600">
                    Blog
                  </span>
                </Link>
              </div>
              <div className="flex justify-center">
                <Link href="/waitlist" onClick={handleMenuToggle}>
                  <button className="text-gray-800 hover:text-pink-600">
                    Get Praise!
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`${
            !isMenuOpen ? 'flex' : 'hidden'
          } headerGroupIcons ml-auto items-center space-x-4`}>
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
