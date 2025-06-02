import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import { useCitiesByState } from '@/hooks/use-cities-by-state'

import SearchIcon from '../assets/icons/search.svg'
import { SIDEBAR_WIDTH } from '../constants'
import { Button } from './ui/button'
import { Select } from './ui/select'

const sidebarFiltersFormSchema = z.object({
  stateCode: z.string().min(2, { message: 'Selecione um estado' }),
  cityCode: z.coerce.number().min(1, { message: 'Selecione uma cidade' }),
  size: z.enum(['SMALL', 'MEDIUM', 'BIG', '']).optional(),
  lifeStage: z.enum(['PUPPY', 'ADULT', 'SENIOR', '']).optional(),
  energyLevel: z.enum(['LOW', 'MEDIUM', 'HIGH', 'VERY_HIGH', '']).optional(),
  independenceLevel: z
    .enum(['LOW', 'MEDIUM', 'HIGH', 'VERY_HIGH', ''])
    .optional(),
})

type SidebarFiltersFormValues = z.infer<typeof sidebarFiltersFormSchema>

export function Sidebar() {
  const navigate = useNavigate()
  const searchParams = useSearch({
    strict: false,
  })

  const { cities, states, onStateChange } = useCitiesByState()

  const { handleSubmit, control, register, setValue } =
    useForm<SidebarFiltersFormValues>({
      resolver: zodResolver(sidebarFiltersFormSchema),
      shouldUnregister: false,
      defaultValues: {
        stateCode: searchParams.stateCode || '',
        cityCode: searchParams.cityCode || 0,
        size: searchParams.size || '',
        lifeStage: searchParams.lifeStage || '',
        energyLevel: searchParams.energyLevel || '',
        independenceLevel: searchParams.independenceLevel || '',
      },
    })

  useEffect(() => {
    if (searchParams.cityCode) {
      setValue('cityCode', searchParams.cityCode)
    }
  }, [cities, setValue, searchParams.cityCode])

  function handleFilterFormSubmit(data: SidebarFiltersFormValues) {
    const searchParams = new URLSearchParams(window.location.search)

    Object.entries(data).forEach(([key, value]) => {
      if (value) {
        searchParams.set(key, String(value))
      } else {
        searchParams.delete(key)
      }
    })

    navigate({
      to: '/pets?' + searchParams.toString(),
    })
  }

  return (
    <form
      style={{
        width: `${SIDEBAR_WIDTH}px`,
      }}
      onSubmit={handleSubmit(handleFilterFormSubmit)}
      className="bg-red-primary fixed inset-0 flex w-full flex-col gap-8 text-white"
    >
      <div className="bg-red-dark flex h-full max-h-[241px] flex-col justify-end gap-6 px-8 pt-4 pb-6">
        <img
          src="/logo-icon.svg"
          alt="Find a friend"
          className="max-w-[45px]"
        />

        <div className="flex items-center gap-3">
          <label htmlFor="stateCode" className="sr-only">
            Estado
          </label>

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
                  onStateChange(ev.target.value)
                  onChange(ev.target.value)
                }}
                placeholder="stateCode"
                className="max-w-20 border-2 border-white/10"
                {...field}
              />
            )}
          />

          <label htmlFor="cityCode" className="sr-only">
            Cidade
          </label>

          <Select
            options={cities.map((city) => ({
              label: city.nome,
              value: city.id.toString(),
            }))}
            placeholder="cityCode"
            className="w-full border-2 border-white/10"
            id="cityCode"
            {...register('cityCode')}
          />

          <Button type="submit" variant="icon" className="shrink-0">
            <img src={SearchIcon} alt="Buscar" />
            <span className="sr-only">Buscar</span>
          </Button>
        </div>
      </div>

      <div className="bg-red-primary space-y- flex-1 space-y-7 px-8">
        <span className="inline-block text-xl font-extrabold">Filtros</span>

        <div className="space-y-7">
          <div className="space-y-1.5">
            <label htmlFor="lifeStage" className="block text-xs font-medium">
              Idade
            </label>

            <Select
              options={[
                { label: 'Filhote', value: 'PUPPY' },
                { label: 'Adulto', value: 'ADULT' },
                { label: 'Idoso', value: 'SENIOR' },
              ]}
              className="bg-red-light"
              id="lifeStage"
              {...register('lifeStage')}
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="" className="block text-xs font-medium">
              Nível de energia
            </label>

            <Select
              options={[
                { label: 'Baixo', value: 'LOW' },
                { label: 'Médio', value: 'MEDIUM' },
                { label: 'Alto', value: 'HIGH' },
                { label: 'Muito alto', value: 'VERY_HIGH' },
              ]}
              className="bg-red-light"
              id="energyLevel"
              {...register('energyLevel')}
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="" className="block text-xs font-medium">
              Porte do animal
            </label>

            <Select
              options={[
                { label: 'Pequeno', value: 'SMALL' },
                { label: 'Médio', value: 'MEDIUM' },
                { label: 'Grande', value: 'BIG' },
              ]}
              className="bg-red-light"
              id="size"
              {...register('size')}
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="" className="block text-xs font-medium">
              Nível de independência
            </label>

            <Select
              options={[
                { label: 'Baixa', value: 'LOW' },
                { label: 'Médio', value: 'MEDIUM' },
                { label: 'Alto', value: 'BIG' },
                { label: 'Muito alto', value: 'VERY_HIGH' },
              ]}
              className="bg-red-light"
              id="independenceLevel"
              {...register('independenceLevel')}
            />
          </div>
        </div>
      </div>
    </form>
  )
}
