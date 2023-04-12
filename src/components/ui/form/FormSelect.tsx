import { FunctionComponent, useState, ChangeEvent, ReactNode } from 'react'
import { UseFormRegister } from 'react-hook-form'

interface FormSelectProps {
  name: string
  register: UseFormRegister<any>
  options: { value: string; label: string }[]
  icon?: ReactNode
  error?: { message?: string }
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void
  disabled?: boolean
}

export const FormSelect: FunctionComponent<FormSelectProps> = ({
  name,
  register,
  options,
  onChange,
  icon,
  disabled,
}) => {
  const [loading, setLoading] = useState(false)

  return (
    <div className="relative w-full">
      <div className="flex items-center">
        {icon && <span className="mr-2">{icon}</span>}
        <select
          className="form-select w-full rounded-none border-none bg-transparent px-3 py-2 text-white placeholder-gray-400 focus:border-transparent focus:placeholder-white focus:outline-none focus:ring-0"
          id={name}
          {...register(name, { required: 'This field is required' })}
          onChange={(e) => {
            register(name)?.onChange?.(e)
            onChange?.(e)
          }}
          onClick={(e) => {
            alert('TeST')
          }}
          disabled={disabled}>
          {loading && <option disabled>Loading...</option>}
          {!loading &&
            options.map(({ value, label }) => (
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
