import { createFileRoute, useSearch } from '@tanstack/react-router'
import { zodValidator } from '@tanstack/zod-adapter'
import { z } from 'zod'

import { Select } from '@/components/ui/select'

import { Error } from '../../components/error'
import { Sidebar } from '../../components/sidebar'
import { SIDEBAR_WIDTH } from '../../constants'

const searchParamsSchema = z.object({
  cityCode: z.coerce.number(),
  stateCode: z.string(),
  size: z.enum(['SMALL', 'MEDIUM', 'BIG']).optional(),
  type: z.enum(['DOG_AND_CAT', 'DOG', 'CAT', 'OTHER']).default('DOG_AND_CAT'),
  lifeStage: z.enum(['PUPPY', 'ADULT', 'SENIOR']).optional(),
  energyLevel: z.enum(['LOW', 'MEDIUM', 'HIGH', 'VERY_HIGH']).optional(),
  independenceLevel: z.enum(['LOW', 'MEDIUM', 'HIGH', 'VERY_HIGH']).optional(),
  page: z.coerce.number().default(1),
})

export const Route = createFileRoute('/pets/')({
  validateSearch: zodValidator(searchParamsSchema),
  errorComponent: () => <Error />,
  head: () => ({
    meta: [
      {
        title: 'Pets | Find a friend',
      },
    ],
  }),
  component: PetsRoute,
})

function PetsRoute() {
  const searchParams = useSearch({ from: '/pets/' })

  return (
    <div className="relative size-full">
      <Sidebar />

      <div
        style={{
          marginLeft: `${SIDEBAR_WIDTH}px`,
        }}
        className="flex-1 px-8 pt-40"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-blue-primary text-xl">
            Encontre <span className="font-extrabold">324 amigos</span> na sua
            cidade
          </h2>

          <Select
            options={[
              { value: 'DOG_AND_CAT', label: 'Gatos e Cachorros' },
              { value: 'DOG', label: 'Cachorros' },
              { value: 'CAT', label: 'Gatos' },
              { value: 'OTHER', label: 'Outros' },
            ]}
            defaultValue={searchParams.type}
            emptyOption={false}
            className="bg-red-lighter text-blue-primary h-12 max-w-[210px] font-normal"
          />
        </div>
      </div>
    </div>
  )
}
