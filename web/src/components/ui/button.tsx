import type { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'
import { tv, type VariantProps } from 'tailwind-variants'

const button = tv({
  base: 'flex items-center justify-center w-full rounded-2xl bg-red-primary text-white cursor-pointer transition-colors',

  variants: {
    variant: {
      icon: 'bg-yellow-primary size-16 hover:bg-yellow-200',
    },
  },
})

type ButtonProps = VariantProps<typeof button> & ComponentProps<'button'>

export function Button({ variant, className, ...props }: ButtonProps) {
  return (
    <button className={twMerge(button({ variant }), className)} {...props} />
  )
}
