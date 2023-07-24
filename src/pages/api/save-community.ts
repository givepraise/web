import { NextApiRequest, NextApiResponse } from 'next'

import { FormData } from '@/types/formData.type'
import { NextRequest } from 'next/server'

interface ISaveCommunityRequest {
  data: FormData
  address: string
}

const API_URL = process.env.API_URL
const API_KEY = process.env.API_KEY
const COMMUNITY_BASE_URL = process.env.COMMUNITY_BASE_URL

export default async function handler(req: NextRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    if (!API_URL || !API_KEY || !COMMUNITY_BASE_URL) {
      res.status(500).json('Internal server error: ENV not setup correctly.')
      return
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
      res.status(response.status).json(jsonResponse)
      return
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json(error.message)
        return
      }
      res.status(500).json('Internal server error')
      return
    }
  }

  res.status(405).setHeader('Allow', 'POST')
}
