import { NEXT_PUBLIC_API_KEY, NEXT_PUBLIC_API_URL } from '@/utils/config'

export const fetchDiscordGuilds = async (accessToken: string) => {
  const response = await fetch('https://discord.com/api/users/@me/guilds', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return await response.json()
}

export const linkBotToCommunity = async (
  signedMessage: string,
  communityId: string
) => {
  const response = await fetch(
    `${NEXT_PUBLIC_API_URL}/community/${communityId}/discord/link`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': NEXT_PUBLIC_API_KEY,
      },
      body: JSON.stringify({
        signed_message: signedMessage,
      }),
    }
  )

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  return await response.json()
}
