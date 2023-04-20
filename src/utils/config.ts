import { mainnet, goerli } from '@wagmi/chains'

export const SITE_NAME =
  'Building a culture of giving and gratitude | Praise 🙏'
export const SITE_DESCRIPTION =
  'Praise is a rewards system allowing communities to acknowledge and reward member contributions.'

export const SITE_URL = 'https://givepraise.xyz/'

export const SOCIAL_TWITTER = '@givepraise'

export const WEB3_CHAINS = [mainnet, goerli]

export const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID as string
export const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET as string

export const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET as string

export const API_URL = process.env.API_URL
export const API_KEY = process.env.API_KEY
