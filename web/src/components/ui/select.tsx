import * as RadixSelect from '@radix-ui/react-select'
import type { ControllerRenderProps } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

import ArrowDownIcon from '@/assets/icons/arrow-down.svg'

interface Option {
  value: string
  label: string
}

interface SelectProps extends Omit<ControllerRenderProps, 'onChange'> {
  options: Option[]
  onValueChange: (value: string) => void
  placeholder?: string
  className?: string
}

export function Select({
  options,
  value,
  onValueChange,
  placeholder,
  className,
  ...props
}: SelectProps) {
  return (
    <RadixSelect.Root onValueChange={onValueChange} value={value} {...props}>
      <RadixSelect.Trigger
        className={twMerge(
          'group flex h-16 w-full items-center justify-center space-x-2 rounded-2xl border px-3.5',
          className,
        )}
      >
        <RadixSelect.Value
          placeholder={placeholder}
          className="placeholder:text-gray-500"
        />
        <RadixSelect.Icon className="-translate-y-px text-xl transition-transform select-none group-data-[state=open]:-rotate-180">
          <img src={ArrowDownIcon} alt="Arrow down" />
        </RadixSelect.Icon>
      </RadixSelect.Trigger>

      <RadixSelect.Portal>
        <RadixSelect.Content
          position="popper"
          side="bottom"
          align="center"
          sideOffset={2}
          className="max-h-[300px] w-full overflow-hidden rounded-lg bg-white p-2 text-black shadow-lg"
          style={{ width: 'var(--radix-popper-anchor-width)' }}
        >
          <RadixSelect.Viewport>
            {options.map((option) => (
              <RadixSelect.Item
                key={option.value}
                value={option.value}
                className="cursor-pointer rounded px-2 py-1 text-sm transition-colors hover:bg-gray-200"
              >
                <RadixSelect.ItemText>{option.label}</RadixSelect.ItemText>
                <RadixSelect.ItemIndicator />
              </RadixSelect.Item>
            ))}
          </RadixSelect.Viewport>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  )
}
