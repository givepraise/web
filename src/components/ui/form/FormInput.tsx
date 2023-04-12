import { FunctionComponent, ChangeEvent, ReactNode } from 'react'
import { UseFormRegister } from 'react-hook-form'

interface FormInputProps {
  name: string
  type: string
  placeholder: string
  icon?: ReactNode
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  register: UseFormRegister<any>
  validationRules?: Record<any, any>
  disabled?: boolean
}

export const FormInput: FunctionComponent<FormInputProps> = ({
  name,
  type,
  placeholder,
  icon,
  onChange,
  register,
  validationRules,
  disabled,
}) => {
  return (
    <div className="relative w-full">
      <div className="flex items-center">
        {icon && <span className="mr-2">{icon}</span>}
        <input
          className="form-input w-full rounded-none border-none border-transparent bg-transparent px-3 py-2 placeholder-gray-400 focus:border-transparent focus:outline-none focus:ring-0"
          id={name}
          type={type}
          placeholder={placeholder}
          {...register(name, { ...validationRules })}
          onChange={(e) => {
            register(name, { ...validationRules })?.onChange?.(e)
            onChange?.(e)
          }}
          disabled={disabled}
        />
      </div>
      <div className="absolute bottom-0 left-0 w-full border-b border-gray-400 " />
    </div>
  )
}
