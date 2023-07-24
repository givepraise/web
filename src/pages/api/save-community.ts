import { FormData } from '@/types/formData.type'
import type { NextRequest } from 'next/server'

interface ISaveCommunityRequest {
  data: FormData
  address: string
}

const API_URL = process.env.API_URL
const API_KEY = process.env.API_KEY
const COMMUNITY_BASE_URL = process.env.COMMUNITY_BASE_URL

export default async function handler(req: NextRequest) {
  if (req.method === 'POST') {
    if (!API_URL || !API_KEY || !COMMUNITY_BASE_URL) {
      return new Response(
        JSON.stringify('Internal server error: ENV not setup correctly.'),
        {
          status: 500,
        }
      )
    }

    const { data, address } = (await req.json()) as ISaveCommunityRequest

    const ownersArray = data.owners.split(', ')
    const ownersString = ownersArray.includes(address)
      ? data.owners
      : data.owners.split(', ').concat(address).join(', ')

    const postData = {
      hostname: `${data.name
        .toLowerCase()
        .replace(/ /g, '-')}.${COMMUNITY_BASE_URL}`,
      name: data.name,
      owners: ownersString.split(/,\s*/),
      creator: address,
      email: data.email,
      discordGuildId: data.discordGuildId,
    }

    try {
      const response = await fetch(`${API_URL}/communities`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY,
        },
        body: JSON.stringify(postData),
      })
      const jsonResponse = await response.json()
      return new Response(JSON.stringify(jsonResponse), {
        status: response.status,
      })
    } catch (error) {
      if (error instanceof Error) {
        return new Response(JSON.stringify(error.message), {
          status: 500,
        })
      }
      return new Response(JSON.stringify('Internal server error'), {
        status: 500,
      })
    }
  }

  return new Response(JSON.stringify(`Method ${req.method} Not Allowed`), {
    status: 405,
    headers: {
      Allow: 'POST',
    },
  })
}
