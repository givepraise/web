import { FunctionComponent, useState, ChangeEvent, ReactNode } from 'react'
import { UseFormRegister } from 'react-hook-form'

interface FormSelectProps {
  name: string
  register: UseFormRegister<any>
  options: { value: string; label: string }[]
  icon?: ReactNode
  error?: { message?: string }
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void
}

export const FormSelect: FunctionComponent<FormSelectProps> = ({
  name,
  register,
  options,
  onChange,
  icon,
}) => {
  const [loading, setLoading] = useState(false)

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    register(name)?.onChange?.(e)
    onChange?.(e)

    // Add or remove the "has-value" class to the select element
    const select = e.currentTarget
    if (select.value) {
      select.classList.add('has-value')
    } else {
      select.classList.remove('has-value')
    }
  }

  return (
    <div className="relative w-full">
      <div className="flex items-center">
        {icon && <span className="mr-2">{icon}</span>}
        <select
          className="form-select w-full rounded-none border-none bg-transparent px-3 py-2 placeholder-gray-400 focus:placeholder-white focus:outline-none"
          id={name}
          {...register(name, { required: 'This field is required' })}
          onChange={handleSelectChange}>
          <option value="" disabled selected hidden>
            Select server
          </option>
          {loading && <option disabled>Loading...</option>}
          {!loading &&
            options.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
        </select>
      </div>
      <div className="absolute bottom-0 left-0 w-full border-b border-gray-400 " />
    </div>
  )
}
