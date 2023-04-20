import { FormData } from '@/types/formData.type'

import type { NextApiRequest, NextApiResponse } from 'next'

interface ISaveCommunityRequest extends NextApiRequest {
  body: {
    data: FormData
    creator: string
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
    const { data, creator } = req.body
    const ownersString = data.owners.split(', ').concat(creator).join(', ')

    const postData = {
      hostname: `${data.name.toLowerCase().replace(/ /g, '-')}.givepraise.xyz`,
      name: data.name,
      owners: ownersString.split(/,\s*/),
      creator,
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
