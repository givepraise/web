import { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { FormSelect } from './FormSelect'
import { FormInput } from './FormInput'
import { signIn, useSession } from 'next-auth/react'

interface InputProps {
  name: keyof FormData
  label: string
  type: string
  placeholder: string
}

type FormData = {
  name: string
  owners: string
  email: string
  discordBot: string
}

export const Form = () => {
  const { data: session } = useSession()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>()

  const [submitting, setSubmitting] = useState(false)
  const [guildOptions, setGuildOptions] = useState([])

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setSubmitting(true)

    console.log('Submitting form:', data)

    try {
      const response = await fetch('https://example.com/api/endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const responseData = await response.json()
      console.log(responseData)
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

      const response = await fetch('https://discord.com/api/users/@me/guilds', {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      })
      const data = await response.json()

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

  const inputs: InputProps[] = [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      placeholder: 'Enter your name',
    },
    {
      name: 'owners',
      label: 'Owners',
      type: 'text',
      placeholder: 'Enter owners separated by commas',
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'Enter your email',
    },
    {
      name: 'discordBot',
      label: 'Discord Bot',
      type: 'select',
      placeholder: 'Select a bot',
    },
  ]

  return (
    <>
      {session && session.accessToken ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          {inputs.map(({ name, label, type, placeholder }, i) => (
            <div key={i} className="mb-4">
              {type === 'select' ? (
                <FormSelect
                  name={name}
                  label={label}
                  placeholder={placeholder}
                  options={guildOptions}
                  register={register}
                />
              ) : (
                <FormInput
                  name={name}
                  label={label}
                  type={type}
                  placeholder={placeholder}
                  register={register}
                  validationRules={{
                    required: 'This field is required',
                    pattern:
                      name === 'email'
                        ? {
                            value:
                              /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: 'Please enter a valid email address',
                          }
                        : undefined,
                  }}
                />
              )}
              {errors[name] && (
                <p className="mt-1 text-xs text-red-500">
                  {errors[name]?.message}
                </p>
              )}
            </div>
          ))}
          <button
            type="submit"
            className="rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
            disabled={submitting}>
            {submitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      ) : (
        <button onClick={() => signIn('discord')}>Sign in to Discord</button>
      )}
    </>
  )
}
