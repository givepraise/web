import { NextApiResponse } from 'next'
import { NextRequest } from 'next/server'

interface ILinkBotCommunityRequest {
  signedMessage: string
  communityId: string
}

const API_URL = process.env.API_URL
const API_KEY = process.env.API_KEY

export default async function handler(req: NextRequest, res: NextApiResponse) {
  if (req.method === 'PATCH') {
    if (!API_URL || !API_KEY) {
      const missingEnvVar = !API_URL ? 'API_URL' : 'API_KEY'
      res.status(500).json({
        error: `Internal server error: Missing environment variable ${missingEnvVar}`,
      })
      return
    }

    const { signedMessage, communityId } =
      (await req.json()) as ILinkBotCommunityRequest

    try {
      const response = await fetch(
        `${API_URL}/communities/${communityId}/discord/link`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY,
          },
          body: JSON.stringify({
            signedMessage: signedMessage,
          }),
        }
      )

      const jsonResponse = await response.json()
      res.status(response.status).json(jsonResponse)
      return
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

  res.status(405).setHeader('Allow', 'PATCH')
}
