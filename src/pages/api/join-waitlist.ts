import { WaitlistFormData } from '@/types/waitlistFormData.type'
import { NextApiRequest, NextApiResponse } from 'next'
import { Client } from '@hubspot/api-client'

const HUBSPOT_ACCESS_TOKEN = process.env.HUBSPOT_ACCESS_TOKEN

interface Errors {
  company?: string
  website?: string
  firstname?: string
  email?: string
}

interface IJoinWaitlistRequest extends NextApiRequest {
  body: {
    data: WaitlistFormData
  }
}

export default async function handler(
  req: IJoinWaitlistRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    if (!HUBSPOT_ACCESS_TOKEN) {
      return res
        .status(500)
        .end(
          `Internal server error: Missing environment variable HUBSPOT_ACCESS_TOKEN`
        )
    }

    const { data } = req.body

    const { company, website, firstname, email } = data

    const errors = {} as Errors

    if (!company || company.trim() === '') {
      errors.company = 'Community name is required'
    }

    if (!website || website.trim() === '') {
      errors.website = 'Website is required'
    }

    if (!firstname || firstname.trim() === '') {
      errors.firstname = 'Contact name is required'
    }

    if (!email || email.trim() === '') {
      errors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is not valid'
    }

    if (Object.keys(errors).length > 0) {
      return {
        statusCode: 400,
        body: JSON.stringify(errors),
      }
    }

    const hubspotClient = new Client({ accessToken: HUBSPOT_ACCESS_TOKEN })

    try {
      const response = await hubspotClient.crm.contacts.basicApi.create({
        properties: data,
      })

      return res.status(200).json('Form submitted successfully')
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
