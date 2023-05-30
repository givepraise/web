import type { NextRequest } from 'next/server'

export const config = {
  runtime: 'edge',
}

interface ILinkBotCommunityRequest {
  signedMessage: string
  communityId: string
}

const API_URL = process.env.API_URL
const API_KEY = process.env.API_KEY

export default async function handler(req: NextRequest) {
  if (req.method === 'PATCH') {
    if (!API_URL || !API_KEY) {
      const missingEnvVar = !API_URL ? 'API_URL' : 'API_KEY'
      return new Response(
        JSON.stringify(
          `Internal server error: Missing environment variable ${missingEnvVar}`
        ),
        {
          status: 500,
        }
      )
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
      Allow: 'PATCH',
    },
  })
}
