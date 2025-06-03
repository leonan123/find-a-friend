import type { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

type LabelProps = ComponentProps<'label'> & {
  required?: boolean
}

export function Label({ className, required = true, children }: LabelProps) {
  return (
    <label
      className={twMerge(
        'text-blue-primary font-semibold',
        required && 'after:text-red-primary after:ml-0.5 after:content-["*"]',
        className,
      )}
    >
      {children}
    </label>
  )
}
