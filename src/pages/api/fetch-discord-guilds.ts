import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const { searchParams } = new URL(`http://localhost${req.url}`)
    const accessToken = searchParams.get('accessToken')

    try {
      const response = await fetch('https://discord.com/api/users/@me/guilds', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
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
