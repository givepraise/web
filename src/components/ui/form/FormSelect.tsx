import { FunctionComponent } from 'react'
import { UseFormRegister } from 'react-hook-form'

interface FormSelectProps {
  name: string
  label: string
  placeholder: string
  register: UseFormRegister<any>
  options: { value: string; label: string }[]
  error?: { message?: string }
}

export const FormSelect: FunctionComponent<FormSelectProps> = ({
  name,
  label,
  placeholder,
  register,
  options,
  error,
}) => {
  return (
    <div className="mb-4">
      <label className="block mb-2 font-bold text-gray-700" htmlFor={name}>
        {label}
      </label>
      <select
        className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none"
        id={name}
        {...register(name, { required: 'This field is required' })}>
        <option value="">{placeholder}</option>
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-xs text-red-500">{error?.message}</p>}
    </div>
  )
}
