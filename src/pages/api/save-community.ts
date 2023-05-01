import { FormData } from '@/types/formData.type'

import type { NextApiRequest, NextApiResponse } from 'next'

interface ISaveCommunityRequest extends NextApiRequest {
  body: {
    data: FormData
    address: string
  }
}

const API_URL = process.env.API_URL
const API_KEY = process.env.API_KEY

export default async function handler(
  req: ISaveCommunityRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    if (!API_URL || !API_KEY) {
      const missingEnvVar = !API_URL ? 'API_URL' : 'API_KEY'
      return res
        .status(500)
        .end(
          `Internal server error: Missing environment variable ${missingEnvVar}`
        )
    }
    const { data, address } = req.body

    const ownersArray = data.owners.split(', ')
    const ownersString = ownersArray.includes(address)
      ? data.owners
      : data.owners.split(', ').concat(address).join(', ')

    const postData = {
      hostname: `${data.name.toLowerCase().replace(/ /g, '-')}.givepraise.xyz`,
      name: data.name,
      owners: ownersString.split(/,\s*/),
      creator: address,
      email: data.email,
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
