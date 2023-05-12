import { ChangeEvent, FunctionComponent, ReactNode, useState } from 'react'

import { SignInResponse } from 'next-auth/react'
import { UseFormRegister } from 'react-hook-form'

interface FormSelectProps {
  name: string
  register: UseFormRegister<any>
  options: { value: string; label: string }[]
  icon?: ReactNode
  error?: { message?: string }
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void
  disabled?: boolean
  onClick?: () => void
}

export const FormSelect: FunctionComponent<FormSelectProps> = ({
  name,
  register,
  options,
  onChange,
  icon,
  disabled,
  onClick,
}) => {
  const [loading, setLoading] = useState(false)

  const handleSelectFocus = async () => {
    if (onClick) {
      setLoading(true)
      await onClick()
      setLoading(false)
    }
  }

  const iconColour = disabled ? 'text-gray-400' : 'text-white'

  return (
    <div className="relative w-full">
      <div className="flex items-center">
        {icon && <span className={`mr-2 pb-1 ${iconColour}`}>{icon}</span>}
        <select
          className={`form-select w-full rounded-none border-none bg-transparent px-3 py-2 ${
            disabled || options.length === 0 ? 'custom-select' : 'text-white'
          } focus:border-transparent focus:outline-none focus:ring-0`}
          id={name}
          {...register(name, { required: 'This field is required' })}
          onFocus={handleSelectFocus}
          onChange={(e) => {
            register(name)?.onChange?.(e)
            onChange?.(e)
          }}
          disabled={disabled}
          defaultValue="">
          {!loading && options.length === 0 && (
            <option value="" disabled hidden>
              Select Discord server
            </option>
          )}
          {loading && <option disabled>Loading...</option>}
          {options.map(({ value, label }) => (
            <option key={value} value={value} className="text-black">
              {label}
            </option>
          ))}
        </select>
      </div>
      <div className="absolute bottom-0 left-0 w-full border-b border-gray-400" />
    </div>
  )
}
