import { FunctionComponent, ChangeEvent } from 'react'
import { UseFormRegister } from 'react-hook-form'

interface FormInputProps {
  name: string
  label: string
  type: string
  placeholder: string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  register: UseFormRegister<any>
  validationRules?: Record<any, any>
  error?: { message?: string }
}

export const FormInput: FunctionComponent<FormInputProps> = ({
  name,
  label,
  type,
  placeholder,
  onChange,
  register,
  validationRules,
  error,
}) => {
  return (
    <div className="mb-4">
      <label className="mb-2 block font-bold text-gray-700" htmlFor={name}>
        {label}
      </label>
      <input
        className="form-input w-full rounded-md px-3 py-2"
        id={name}
        type={type}
        placeholder={placeholder}
        {...register(name, { ...validationRules })}
        onChange={(e) => {
          register(name, { ...validationRules })?.onChange?.(e)
          onChange?.(e)
        }}
      />
      {/* {error && <p className="mt-1 text-xs text-red-500">{error?.message}</p>} */}
    </div>
  )
}
