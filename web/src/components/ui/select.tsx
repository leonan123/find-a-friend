import { CaretDownIcon } from '@phosphor-icons/react'
import type { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

interface Option {
  value: string
  label: string
  isSelected?: boolean
}

interface SelectProps extends ComponentProps<'select'> {
  options: Option[]
  emptyOption?: boolean
  placeholder?: string
}

export function Select({
  options,
  className,
  placeholder,
  emptyOption = true,
  ...props
}: SelectProps) {
  return (
    <div
      className={twMerge(
        'group relative flex h-16 w-full items-center rounded-lg border border-gray-200 bg-gray-100 pl-3.5 font-extrabold tracking-wide focus-within:outline focus-within:outline-blue-500',
        className,
      )}
    >
      <select
        className="size-full flex-1 appearance-none truncate pr-6 outline-none"
        {...props}
      >
        {emptyOption && <option value="">Selecione</option>}

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <div className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 transition-transform group-has-open:-rotate-180">
        <CaretDownIcon className="size-full" />
      </div>
    </div>
  )
}
