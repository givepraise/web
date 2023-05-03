import type { NextApiRequest, NextApiResponse } from 'next'

import { FormData } from '@/types/formData.type'

interface ISaveCommunityRequest extends NextApiRequest {
  body: {
    data: FormData
    address: string
  }
}

const API_URL = process.env.API_URL
const API_KEY = process.env.API_KEY
const COMMUNITY_BASE_URL = process.env.COMMUNITY_BASE_URL

export default async function handler(
  req: ISaveCommunityRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    if (!API_URL || !API_KEY || !COMMUNITY_BASE_URL) {
      return res
        .status(500)
        .end(`Internal server error: ENV not setup correctly.`)
    }
    const { data, address } = req.body

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
      return res.status(response.status).json(jsonResponse)
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).end(error.message)
      }
      return res.status(500).end('Internal server error')
    }
  }

  res.setHeader('Allow', ['POST'])
  return res.status(405).end(`Method ${req.method} Not Allowed`)
}
