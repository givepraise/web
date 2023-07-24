import { NextApiResponse } from 'next'
import { NextRequest } from 'next/server'

const API_URL = process.env.API_URL
const API_KEY = process.env.API_KEY

export default async function handler(req: NextRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    if (!API_URL || !API_KEY) {
      const missingEnvVar = !API_URL ? 'API_URL' : 'API_KEY'
      res.status(500).json({
        error: `Internal server error: Missing environment variable ${missingEnvVar}`,
      })
      return
    }

    const { searchParams } = new URL(`http://localhost${req.url}`)
    const name = searchParams.get('name')
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
      if (response.status === 200) {
        res.status(200).json(await response.json())
        return
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({
          error: error.message,
        })
        return
      }
      res.status(500).json({
        error: 'Internal server error.',
      })
      return
    }
  }
  res.status(405).setHeader('Allow', 'GET')
}
