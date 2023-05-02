import type { NextApiRequest, NextApiResponse } from 'next'

interface ICheckCommunityNameRequest extends NextApiRequest {
  query: {
    name: string
  }
}

const API_URL = process.env.API_URL
const API_KEY = process.env.API_KEY

export default async function handler(
  req: ICheckCommunityNameRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    if (!API_URL || !API_KEY) {
      const missingEnvVar = !API_URL ? 'API_URL' : 'API_KEY'
      return res
        .status(500)
        .end(
          `Internal server error: Missing environment variable ${missingEnvVar}`
        )
    }
    const { name } = req.query

    try {
      const response = await fetch(
        `${API_URL}/communities/isNameAvailable?name=${name}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY,
          },
        }
      )
      const jsonResponse = await response.json()

      return res.status(response.status).json(jsonResponse)
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).end(error.message)
      }
      return res.status(500).end('Internal server error')
    }
  }

  res.setHeader('Allow', ['GET'])
  return res.status(405).end(`Method ${req.method} Not Allowed`)
}
