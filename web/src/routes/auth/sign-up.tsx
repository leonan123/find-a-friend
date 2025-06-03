import { zodResolver } from '@hookform/resolvers/zod'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import * as Input from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { useCitiesByState } from '@/hooks/use-cities-by-state'
import { createOrganization } from '@/http/create-organization'

export const Route = createFileRoute('/auth/sign-up')({
  component: SignUpRoute,
})

const signUpSchema = z
  .object({
    responsibleName: z.string().min(1, { message: 'Esse campo é obrigatório' }),
    email: z.string().email({ message: 'Insira um email válido' }),
    zipCode: z.string().min(8, { message: 'Insira um cep válido' }),
    neighborhood: z.string().min(1, { message: 'Esse campo é obrigatório' }),
    address: z.string().min(1, { message: 'Esse campo é obrigatório' }),
    whatsapp: z.string().min(1, { message: 'Esse campo é obrigatório' }),
    stateCode: z.string().min(2, { message: 'Selecione um estado' }),
    IBGECityCode: z.string().min(1, { message: 'Selecione uma cidade' }),
    password: z.string().min(1, { message: 'Esse campo é obrigatório' }),
    confirmPassword: z.string().min(1, { message: 'Esse campo é obrigatório' }),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        path: ['confirmPassword'],
        message: 'As senhas precisam ser iguais',
      })
    }
  })

type SignUpFormValues = z.infer<typeof signUpSchema>

function SignUpRoute() {
  const navigate = useNavigate()
  const { cities, states, onStateChange } = useCitiesByState()

  const {
    control,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
  })

  async function handleSignUpFormSubmit(formData: SignUpFormValues) {
    const { confirmPassword: _, ...data } = formData

    const { success } = await createOrganization(data)

    if (success) {
      navigate({
        to: '/auth/sign-in',
      })
    }
  }

  return (
    <div className="space-y-8 lg:space-y-16">
      <h1 className="text-blue-primary text-center text-3xl font-bold lg:pt-6 lg:text-5xl">
        Cadastre sua organização
      </h1>

      <form
        className="space-y-14"
        onSubmit={handleSubmit(handleSignUpFormSubmit)}
      >
        <div className="space-y-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <Label htmlFor="responsibleName">Nome do responsável</Label>
              {errors.responsibleName && (
                <span className="text-red-primary text-sm">
                  {errors.responsibleName.message}
                </span>
              )}
            </div>

            <Input.Root>
              <Input.Control type="text" {...register('responsibleName')} />
            </Input.Root>
          </div>

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
              <Label htmlFor="zipCode">CEP</Label>
              {errors.zipCode && (
                <span className="text-red-primary text-sm">
                  {errors.zipCode.message}
                </span>
              )}
            </div>

            <Input.Root>
              <Input.Control type="text" {...register('zipCode')} />
            </Input.Root>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex w-full flex-col gap-1">
              <div className="flex items-center justify-between">
                <Label htmlFor="address" aria-req>
                  Endereço
                </Label>
                {errors.address && (
                  <span className="text-red-primary text-sm">
                    {errors.address.message}
                  </span>
                )}
              </div>

              <Input.Root>
                <Input.Control type="text" {...register('address')} />
              </Input.Root>
            </div>

            <div className="flex w-full flex-col gap-1">
              <div className="flex items-center justify-between">
                <Label htmlFor="address">Bairro</Label>
                {errors.neighborhood && (
                  <span className="text-red-primary text-sm">
                    {errors.neighborhood.message}
                  </span>
                )}
              </div>

              <Input.Root>
                <Input.Control type="text" {...register('neighborhood')} />
              </Input.Root>
            </div>
          </div>

          <div className="flex w-full items-center gap-4">
            <div className="flex w-full flex-col gap-1">
              <div className="flex items-center justify-between">
                <Label htmlFor="stateCode">Estado</Label>
                {errors.stateCode && (
                  <span className="text-red-primary text-sm">
                    {errors.stateCode.message}
                  </span>
                )}
              </div>

              <Controller
                name="stateCode"
                control={control}
                render={({ field: { onChange, value, ...field } }) => (
                  <Select
                    id="stateCode"
                    options={states.map((state) => ({
                      label: state.sigla,
                      value: state.sigla,
                    }))}
                    value={value}
                    onChange={(ev) => {
                      setValue('IBGECityCode', '')
                      onChange(ev.target.value)
                      onStateChange(ev.target.value)
                    }}
                    placeholder="UF"
                    className="text-blue-primary text-lg font-normal"
                    {...field}
                  />
                )}
              />
            </div>

            <div className="flex w-full flex-col gap-1">
              <div className="flex items-center justify-between">
                <Label htmlFor="IBGECityCode">Cidade</Label>
                {errors.IBGECityCode && (
                  <span className="text-red-primary text-sm">
                    {errors.IBGECityCode.message}
                  </span>
                )}
              </div>

              <Select
                options={cities.map((city) => ({
                  label: city.nome,
                  value: city.id.toString(),
                }))}
                placeholder="Selecione"
                className="text-blue-primary text-lg font-normal"
                {...register('IBGECityCode')}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <Label htmlFor="whatsapp">Whatsapp</Label>
              {errors.whatsapp && (
                <span className="text-red-primary text-sm">
                  {errors.whatsapp.message}
                </span>
              )}
            </div>

            <Input.Root>
              <Input.Control type="text" {...register('whatsapp')} />
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

          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <Label htmlFor="confirmPassword">Confirmar senha</Label>
              {errors.confirmPassword && (
                <span className="text-red-primary text-sm">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>

            <Input.Root>
              <Input.Control type="password" {...register('confirmPassword')} />
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
