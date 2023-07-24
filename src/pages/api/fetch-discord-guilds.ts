import type { NextRequest } from 'next/server'

export default async function handler(req: NextRequest) {
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
      Allow: 'GET',
    },
  })
}
