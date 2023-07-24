import { NextApiRequest, NextApiResponse } from 'next'

const API_URL = process.env.API_URL
const API_KEY = process.env.API_KEY

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    if (!API_URL || !API_KEY) {
      const missingEnvVar = !API_URL ? 'API_URL' : 'API_KEY'
      res.status(500).json({
        error: `Internal server error: Missing environment variable ${missingEnvVar}`,
      })
      return
    }

    const { searchParams } = new URL(`http://localhost${req.url}`)
    const communityId = searchParams.get('communityId')

    try {
      const response = await fetch(`${API_URL}/communities/${communityId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY,
        },
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

  res.status(405).setHeader('Allow', 'GET')
}
