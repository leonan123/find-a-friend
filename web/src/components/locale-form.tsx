import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import type { City } from '../@types'
import SearchIcon from '../assets/icons/search.svg'
import { getCitiesFromState } from '../http/get-cities-from-state'
import { getStates } from '../http/get-states'
import { Select } from './ui/select'

const localeFormSchema = z.object({
  stateCode: z.string().min(2, { message: 'Selecione um estado' }),
  cityCode: z.coerce.number().min(1, { message: 'Selecione uma cidade' }),
})

type LocaleFormValues = z.infer<typeof localeFormSchema>

export function LocaleForm() {
  const navigate = useNavigate()
  const [cities, setCities] = useState<City[]>([])

  const { handleSubmit, control, setValue } = useForm<LocaleFormValues>({
    resolver: zodResolver(localeFormSchema),
  })

  const { data } = useQuery({
    queryKey: ['states'],
    queryFn: () => getStates(),
  })

  async function handleStateChange(value: string) {
    const response = await getCitiesFromState(value)
    setCities(response.cities)
  }

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
                options={
                  data?.states.map((state) => ({
                    label: state.sigla,
                    value: state.sigla,
                  })) || []
                }
                value={value}
                onValueChange={(value) => {
                  onChange(value)
                  setValue('cityCode', 0)
                  handleStateChange(value)
                }}
                placeholder="UF"
                className="max-w-20"
                {...field}
              />
            )}
          />

          <Controller
            name="cityCode"
            control={control}
            render={({ field: { onChange, value, ...field } }) => (
              <Select
                options={cities.map((city) => ({
                  label: city.nome,
                  value: city.id.toString(),
                }))}
                value={value}
                onValueChange={onChange}
                placeholder="Selecione"
                className="w-full lg:max-w-[240px]"
                {...field}
              />
            )}
          />
        </div>
      </div>

      <button
        type="submit"
        className="bg-yellow-primary flex size-16 min-w-16 cursor-pointer items-center justify-center rounded-2xl transition-colors hover:bg-yellow-200"
      >
        <img src={SearchIcon} alt="Buscar" />
        <span className="sr-only">Buscar</span>
      </button>
    </form>
  )
}
