import { mainnet, goerli } from '@wagmi/chains'

export const SITE_NAME = 'Next.js Web3 Starter'
export const SITE_DESCRIPTION = 'Next.js + Web3 powered by General Magic.'
export const SITE_URL = 'https://starter.generalmagic.io/'

export const SOCIAL_TWITTER = 'generalmagicio'
export const SOCIAL_GITHUB = 'GeneralMagicio/next-web3-starter'

export const WEB3_CHAINS = [mainnet, goerli]

export const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID as string
export const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET as string

export const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET as string

export const API_URL = process.env.NEXT_PUBLIC_API_URL as string
export const API_KEY = process.env.NEXT_PUBLIC_API_KEY as string
