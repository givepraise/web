import { FormData } from '@/types/formData.type'
import { NEXT_PUBLIC_API_KEY, NEXT_PUBLIC_API_URL } from '@/utils/config'

export const saveComunnityData = async (data: FormData, creator: string) => {
  const ownersString = data.owners.split(', ').concat(creator).join(', ')

  const postData = {
    hostname: `${data.name.toLowerCase().replace(/ /g, '-')}.givepraise.xyz`,
    name: data.name,
    owners: ownersString.split(/,\s*/),
    creator,
    email: data.email,
  }

  const response = await fetch(`${NEXT_PUBLIC_API_URL}/communities`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': NEXT_PUBLIC_API_KEY,
    },
    body: JSON.stringify(postData),
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  return await response.json()
}
