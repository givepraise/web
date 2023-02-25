import { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { FormSelect } from './FormSelect'
import { FormInput } from './FormInput'
import { signIn, useSession } from 'next-auth/react'
import { formDataState } from '@/services/form'
import { useRecoilState } from 'recoil'
import { fetchDiscordGuilds, saveComunnityData } from '@/services/api'
import { FormData } from '@/types/formData.type'

export const Form = () => {
  const { data: session } = useSession()

  const [formData, setFormData] = useRecoilState(formDataState)
  const [submitting, setSubmitting] = useState(false)
  const [guildOptions, setGuildOptions] = useState([])

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: formData,
  })

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setSubmitting(true)
    setFormData(data)

    try {
      const response = await saveComunnityData(data)
      console.log(response)
      reset()
    } catch (error) {
      console.error('Error submitting form:', error)
    }

    setSubmitting(false)
  }

  useEffect(() => {
    const fetchGuilds = async () => {
      if (!session?.accessToken) {
        return
      }

      const data = await fetchDiscordGuilds(session.accessToken)

      if (data && data.length > 0) {
        setGuildOptions(
          data.map((guild: any) => ({
            value: guild.id,
            label: guild.name,
          }))
        )
      }
    }

    if (guildOptions.length === 0 && session?.accessToken) {
      fetchGuilds()
    }
  }, [session, guildOptions])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      FORM DATA: {JSON.stringify(formData)}
      <div className="mb-4">
        <FormInput
          name="name"
          label="Name"
          type="text"
          placeholder="Enter your name"
          onChange={(event) =>
            setFormData({ ...formData, name: event.target.value })
          }
          register={register}
          validationRules={{
            required: 'This field is required',
          }}
        />
        {errors['name'] && (
          <p className="mt-1 text-xs text-red-500">{errors['name']?.message}</p>
        )}
      </div>
      <div className="mb-4">
        <FormInput
          name="owners"
          label="Owners"
          type="text"
          placeholder="Enter owners separated by commas"
          onChange={(event) =>
            setFormData({ ...formData, owners: event.target.value })
          }
          register={register}
          validationRules={{
            required: 'This field is required',
            validate: {
              areValidEthAddresses: async (value: any) => {
                const addresses = value.split(',')
                const regex = /^0x([A-Fa-f0-9]{40})$/

                for (const address of addresses) {
                  if (!regex.test(address.trim())) {
                    return 'Please enter valid Ethereum addresses'
                  }
                }

                return true
              },
            },
          }}
        />
        {errors['owners'] && (
          <p className="mt-1 text-xs text-red-500">
            {errors['owners']?.message}
          </p>
        )}
      </div>
      <div className="mb-4">
        <FormInput
          name="email"
          label="Email"
          type="email"
          placeholder="Enter your email"
          onChange={(event) =>
            setFormData({ ...formData, email: event.target.value })
          }
          register={register}
          validationRules={{
            required: 'This field is required',
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: 'Please enter a valid email address',
            },
          }}
        />
        {errors['email'] && (
          <p className="mt-1 text-xs text-red-500">
            {errors['email']?.message}
          </p>
        )}
      </div>
      {session && session.accessToken ? (
        <>
          <div className="mb-4">
            <FormSelect
              name="guild"
              label="Guild"
              options={guildOptions}
              register={register}
              onChange={(event) =>
                setFormData({ ...formData, guild: event.target.value })
              }
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
            disabled={submitting}>
            {submitting ? 'Submitting...' : 'Submit'}
          </button>
        </>
      ) : (
        <button
          type="button"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          onClick={() => signIn('discord')}>
          Sign in with Discord
        </button>
      )}
    </form>
  )
}
