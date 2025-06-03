import { EyeIcon, EyeSlashIcon } from '@phosphor-icons/react'
import { type ComponentProps, createContext, use, useState } from 'react'
import { twMerge } from 'tailwind-merge'

interface InputContext {
  isPassword: boolean
  handleTogglePassword: () => void
}

const inputContext = createContext({} as InputContext)

function Root({ className, ...props }: ComponentProps<'div'>) {
  const [isPassword, setIsPassword] = useState(true)

  function handleTogglePassword() {
    setIsPassword((prev) => !prev)
  }

  return (
    <inputContext.Provider value={{ isPassword, handleTogglePassword }}>
      <div
        className={twMerge(
          'group flex h-16 items-center gap-3 rounded-lg border border-gray-200 bg-gray-100 px-4 focus-within:outline focus-within:outline-blue-500',
          className,
        )}
        {...props}
      />
    </inputContext.Provider>
  )
}

function Control({ className, ...props }: ComponentProps<'input'>) {
  const { isPassword } = use(inputContext)

  return (
    <input
      className={twMerge(
        'text-blue-primary size-full text-lg outline-none',
        className,
      )}
      id={props.id || props.name}
      {...props}
      type={!isPassword ? 'text' : props.type}
    />
  )
}

function Toggle({ className, ...props }: ComponentProps<'button'>) {
  const { handleTogglePassword, isPassword } = use(inputContext)

  return (
    <button
      className={twMerge('text-blue-primary/50 size-6 shrink-0', className)}
      onClick={handleTogglePassword}
      type="button"
      {...props}
    >
      {isPassword ? (
        <EyeSlashIcon className="size-full" />
      ) : (
        <EyeIcon className="size-full" />
      )}
    </button>
  )
}

export { Control, Root, Toggle }
