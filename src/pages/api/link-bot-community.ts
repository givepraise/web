import { API_URL } from '@/utils/config'
import type { NextApiRequest, NextApiResponse } from 'next'
import { API_KEY } from '../../utils/config'

interface ILinkBotCommunityRequest extends NextApiRequest {
  body: {
    signedMessage: string
    communityId: string
  }
}

export default async function handler(
  req: ILinkBotCommunityRequest,
  res: NextApiResponse
) {
  if (req.method === 'PATCH') {
    if (!API_URL || !API_KEY) {
      const missingEnvVar = !API_URL ? 'API_URL' : 'API_KEY'
      return res
        .status(500)
        .end(
          `Internal server error: Missing environment variable ${missingEnvVar}`
        )
    }

    const { signedMessage, communityId } = req.body

    try {
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

      const jsonResponse = await response.json()
      return res.status(response.status).json(jsonResponse)
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).end(error.message)
      }
      return res.status(500).end('Internal server error')
    }
  }

  res.setHeader('Allow', ['PATCH'])
  return res.status(405).end(`Method ${req.method} Not Allowed`)
}
