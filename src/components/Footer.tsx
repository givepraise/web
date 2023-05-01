import { FaExternalLinkAlt } from 'react-icons/fa'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="z-10 mt-auto bg-black p-4 py-12 text-center text-white">
      <div className="mb-4 flex justify-center">
        <Link
          href="https://github.com/givepraise/praise"
          className="mx-4 flex items-center hover:text-pink-600 hover:underline">
          <div className="flex items-center">
            <span className="mr-1">Github</span>
            <FaExternalLinkAlt className="text-sm" />
          </div>
        </Link>

        <span className="mt-1 text-xs text-gray-800">•</span>
        <Link
          href="https://discord.com/invite/U2ydzXBG6C"
          className="mx-4 flex items-center hover:text-pink-600 hover:underline">
          <div className="flex items-center">
            <span className="mr-1">Discord</span>
            <FaExternalLinkAlt className="text-sm" />
          </div>
        </Link>
        <span className="mt-1 text-xs text-gray-800">•</span>
        <Link
          href="https://twitter.com/givepraise"
          className="mx-4 flex items-center hover:text-pink-600 hover:underline">
          <div className="flex items-center">
            <span className="mr-1">Twitter</span>
            <FaExternalLinkAlt className="text-sm" />
          </div>
        </Link>
      </div>
      <p className="mx-auto max-w-xl">
        Praise is an open source system developed by{' '}
        <Link
          href="https://www.generalmagic.io/"
          className="text-pink-600 hover:underline">
          General Magic
        </Link>
        . To learn more about how Praise could be used in your community please
        reach out to us!
      </p>
    </footer>
  )
}

export default Footer
