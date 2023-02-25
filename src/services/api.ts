import { FormData } from '@/types/formData.type'

export const fetchDiscordGuilds = async (accessToken: string) => {
  const response = await fetch('https://discord.com/api/users/@me/guilds', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  return await response.json()
}

export const saveComunnityData = async (data: FormData) => {
  const response = await fetch('https://example.com/api/endpoint', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  return await response.json()
}
