import { FunctionComponent, useState } from 'react'
import { UseFormRegister } from 'react-hook-form'

interface FormSelectProps {
  name: string
  label: string
  placeholder: string
  register: UseFormRegister<any>
  options: { value: string; label: string }[]
  error?: { message?: string }
  onClick?: () => void
}

export const FormSelect: FunctionComponent<FormSelectProps> = ({
  name,
  label,
  placeholder,
  register,
  options,
  error,
  onClick,
}) => {
  const [loading, setLoading] = useState(false)

  const handleSelectClick = async () => {
    if (onClick) {
      setLoading(true)
      await onClick()
      setLoading(false)
    }
  }

  return (
    <div className="mb-4">
      <label className="mb-2 block font-bold text-gray-700" htmlFor={name}>
        {label}
      </label>
      <select
        className="w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
        id={name}
        {...register(name, { required: 'This field is required' })}
        // onClick={handleSelectClick}
      >
        {/* <option value="">{placeholder}</option> */}
        {loading && <option disabled>Loading...</option>}
        {!loading &&
          options.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
      </select>
      {error && <p className="mt-1 text-xs text-red-500">{error?.message}</p>}
    </div>
  )
}
