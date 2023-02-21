import { useState } from 'react'
import { useForm, SubmitHandler, UseFormRegister } from 'react-hook-form'
import { FormSelect } from './FormSelect'
import { FormInput } from './FormInput'

interface InputProps {
  name: keyof FormData
  label: string
  type: string
  placeholder: string
}

interface Register {
  [key: string]: UseFormRegister<FormData>
}

type FormData = {
  name: string
  owners: string
  email: string
  discordBot: string
}

export const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>()

  const [submitting, setSubmitting] = useState(false)

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

  // const registerInputs: Register = inputs.reduce(
  //   (acc, { name, ...rest }) => ({
  //     ...acc,
  //     [name]:
  //       name === 'email'
  //         ? register(name, {
  //             required: 'This field is required',
  //             pattern: {
  //               value: /\S+@\S+\.\S+/,
  //               message: 'Please enter a valid email address',
  //             },
  //             ...rest,
  //           })
  //         : register(name, {
  //             required: 'This field is required',
  //             ...rest,
  //           }),
  //   }),
  //   {}
  // )

  // console.log('REGISTER INPUTS: ', registerInputs)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {inputs.map(({ name, label, type, placeholder }, i) => (
        <div key={i} className="mb-4">
          {type === 'select' ? (
            <FormSelect
              name={name}
              register={register}
              label="Select a bot"
              placeholder="Select a bot"
              options={[
                { value: '1', label: 'Bot 1' },
                { value: '2', label: 'Bot 2' },
                { value: '3', label: 'Bot 3' },
              ]}
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
            <p className="mt-1 text-xs text-red-500">{errors[name]?.message}</p>
          )}
        </div>
      ))}
      <button
        type="submit"
        className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
        disabled={submitting}>
        {submitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  )
}
