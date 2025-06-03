import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import { useCitiesByState } from '@/hooks/use-cities-by-state'

import SearchIcon from '../assets/icons/search.svg'
import { Button } from './ui/button'
import { Select } from './ui/select'

const localeFormSchema = z.object({
  stateCode: z.string().min(2, { message: 'Selecione um estado' }),
  cityCode: z.coerce.number().min(1, { message: 'Selecione uma cidade' }),
})

type LocaleFormValues = z.infer<typeof localeFormSchema>

export function LocaleForm() {
  const navigate = useNavigate()
  const { cities, states, onStateChange } = useCitiesByState()

  const { handleSubmit, control, register, setValue } =
    useForm<LocaleFormValues>({
      resolver: zodResolver(localeFormSchema),
    })

  function handleLocaleFormSubmit(data: LocaleFormValues) {
    navigate({
      to: `/pets`,
      search: {
        page: 1,
        stateCode: data.stateCode,
        cityCode: data.cityCode,
      },
    })
  }

  return (
    <form
      className="inline-flex w-full flex-wrap items-end gap-2 lg:gap-8"
      onSubmit={handleSubmit(handleLocaleFormSubmit)}
    >
      <div className="flex flex-1 flex-col justify-end gap-2 lg:flex-row lg:items-center lg:gap-8">
        <span className="block shrink-0 text-start align-middle font-light">
          Busque um amigo:
        </span>

        <div className="flex w-full gap-2">
          <label htmlFor="stateCode" className="sr-only">
            Cidade
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
                  setValue('cityCode', 0)
                  onChange(ev.target.value)
                  onStateChange(ev.target.value)
                }}
                placeholder="UF"
                className="max-w-20 border-2 border-white/10 bg-transparent"
                {...field}
              />
            )}
          />

          <Select
            options={cities.map((city) => ({
              label: city.nome,
              value: city.id.toString(),
            }))}
            placeholder="Selecione"
            className="w-full border-2 border-white/10 bg-transparent lg:max-w-[240px]"
            {...register('cityCode')}
          />
        </div>
      </div>

      <Button type="submit" variant="icon">
        <img src={SearchIcon} alt="Buscar" />
        <span className="sr-only">Buscar</span>
      </Button>
    </form>
  )
}
