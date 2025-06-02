import type { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

import ArrowDownIcon from '@/assets/icons/arrow-down.svg'

interface Option {
  value: string
  label: string
  isSelected?: boolean
}

interface SelectProps extends ComponentProps<'select'> {
  options: Option[]
  placeholder?: string
}

export function Select({
  options,
  className,
  placeholder,
  ...props
}: SelectProps) {
  return (
    <div
      className={twMerge(
        'group relative flex h-16 w-full items-center rounded-2xl pl-3.5 font-extrabold tracking-wide focus-within:outline focus-within:outline-blue-500',
        className,
      )}
    >
      <select
        className="size-full flex-1 appearance-none truncate pr-6 outline-none"
        {...props}
      >
        <option value="">Selecione</option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <div className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 transition-transform group-has-open:-rotate-180">
        <img src={ArrowDownIcon} className="size-full" />
      </div>
    </div>
  )
}
