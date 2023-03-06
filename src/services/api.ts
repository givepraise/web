import { FormData } from '@/types/formData.type'
import { API_KEY, API_URL, NEXTAUTH_SECRET } from '@/utils/config'

export const fetchDiscordGuilds = async (accessToken: string) => {
  const response = await fetch('https://discord.com/api/users/@me/guilds', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return await response.json()
}

export const saveComunnityData = async (data: FormData, creator: string) => {
  const ownersString = data.owners.split(', ').concat(creator).join(', ')

  const postData = {
    hostname: `http://${data.name
      .toLowerCase()
      .replace(/ /g, '-')}.givepraise.xyz`,
    name: data.name,
    // owners: ownersString.split(/,\s*/),
    owners: ownersString,
    creator,
  }

  const response = await fetch(`${API_URL}/communities`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
    },
    body: JSON.stringify(postData),
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  return await response.json()
}

export const linkBotToCommunity = async (
  signedMessage: string,
  communityId: string
) => {
  const response = await fetch(
    `${API_URL}/community/${communityId}/discord/link`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
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
