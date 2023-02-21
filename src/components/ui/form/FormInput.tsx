import { FunctionComponent } from 'react'
import { UseFormRegister } from 'react-hook-form'

interface FormInputProps {
  name: string
  label: string
  type: string
  placeholder: string
  register: UseFormRegister<any>
  validationRules?: Record<any, any>
  error?: { message?: string }
}

export const FormInput: FunctionComponent<FormInputProps> = ({
  name,
  label,
  type,
  placeholder,
  register,
  validationRules,
  error,
}) => {
  return (
    <div className="mb-4">
      <label className="block mb-2 font-bold text-gray-700" htmlFor={name}>
        {label}
      </label>
      <input
        className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none"
        id={name}
        type={type}
        placeholder={placeholder}
        {...register(name, { ...validationRules })}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error?.message}</p>}
    </div>
  )
}
