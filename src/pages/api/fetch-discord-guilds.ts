import type { NextApiRequest, NextApiResponse } from 'next'

interface IFetchDiscordGuildsRequest extends NextApiRequest {
  query: {
    accessToken: string
  }
}

export default async function handler(
  req: IFetchDiscordGuildsRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const { accessToken } = req.query

    console.log('accessToken', accessToken)

    try {
      const response = await fetch('https://discord.com/api/users/@me/guilds', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
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

  res.setHeader('Allow', ['GET'])
  return res.status(405).end(`Method ${req.method} Not Allowed`)
}
