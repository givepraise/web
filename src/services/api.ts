import { FormData } from '@/types/formData.type'
import { useAccount } from 'wagmi'

export const fetchDiscordGuilds = async (accessToken: string) => {
  const response = await fetch('https://discord.com/api/users/@me/guilds', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return await response.json()
}

export const saveComunnityData = async (data: FormData, creator: string) => {
  const postData = {
    ...data,
    owners: data.owners.split(', ').concat(creator).join(', '),
    creator,
  }

  const response = await fetch('https://example.com/api/endpoint', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  return await response.json()
}
