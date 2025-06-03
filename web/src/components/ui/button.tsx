import * as Slot from '@radix-ui/react-slot'
import type { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'
import { tv, type VariantProps } from 'tailwind-variants'

const button = tv({
  base: 'flex items-center h-16 justify-center font-extrabold text-xl w-full rounded-2xl text-white cursor-pointer transition-colors',

  variants: {
    variant: {
      primary: 'bg-blue-primary hover:bg-blue-primary/90',
      secondary: 'text-blue-primary bg-gray-100 hover:bg-gray-200/50',
      icon: 'bg-yellow-primary size-16 hover:bg-yellow-200',
    },
  },

  defaultVariants: {
    variant: 'primary',
  },
})

type ButtonProps = VariantProps<typeof button> &
  ComponentProps<'button'> & {
    asChild?: boolean
  }

export function Button({ asChild, variant, className, ...props }: ButtonProps) {
  const Comp = asChild ? Slot.Root : 'button'

  return <Comp className={twMerge(button({ variant }), className)} {...props} />
}
