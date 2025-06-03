import { zodResolver } from '@hookform/resolvers/zod'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import * as Input from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { authenticate } from '@/http/authenticate'

export const Route = createFileRoute('/auth/sign-in')({
  component: SignInRoute,
})

const signInSchema = z.object({
  email: z.string().email({ message: 'Insira um email válido' }),
  password: z.string().min(1, { message: 'Insira sua senha' }),
})

type SignInFormValues = z.infer<typeof signInSchema>

function SignInRoute() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
  })

  async function handleSignInFormSubmit(data: SignInFormValues) {
    const { token } = await authenticate(data)

    localStorage.setItem('token', token)

    navigate({
      to: '/',
    })
  }

  return (
    <div className="space-y-8 lg:space-y-28">
      <h1 className="text-blue-primary text-center text-3xl font-bold lg:pt-28 lg:text-start lg:text-5xl">
        Boas vindas
      </h1>

      <form
        className="space-y-14"
        onSubmit={handleSubmit(handleSignInFormSubmit)}
      >
        <div className="space-y-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <Label htmlFor="email">Email</Label>

              {errors.email && (
                <span className="text-red-primary text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>

            <Input.Root>
              <Input.Control type="email" {...register('email')} />
            </Input.Root>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Senha</Label>

              {errors.password && (
                <span className="text-red-primary text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>

            <Input.Root>
              <Input.Control type="password" {...register('password')} />
              <Input.Toggle />
            </Input.Root>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <Button type="submit">Login</Button>
          <Button type="button" variant="secondary" asChild>
            <Link to="/auth/sign-up">Cadastrar minha organização</Link>
          </Button>
        </div>
      </form>
    </div>
  )
}
