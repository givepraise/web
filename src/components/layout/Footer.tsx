import Image from 'next/image'
import { FaGithub, FaTwitter } from 'react-icons/fa'
import { SOCIAL_GITHUB, SOCIAL_TWITTER } from '@/utils/config'

export function Footer() {
  return (
    <footer className="mt-auto bg-gray-200 p-4 text-center">
      <h4 className="mr-2">
        Made with ❤️ by{' '}
        <a
          className="font-bold"
          target="_blank"
          href={`https://twitter.com/${SOCIAL_TWITTER}`}
          rel="noreferrer">
          General Magic
        </a>
      </h4>{' '}
      <a
        href={`https://github.com/${SOCIAL_GITHUB}`}
        target="_blank"
        rel="noreferrer">
        <FaGithub />
      </a>
    </footer>
  )
}
