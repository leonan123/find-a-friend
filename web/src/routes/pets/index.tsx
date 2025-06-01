import { createFileRoute } from '@tanstack/react-router'
import { zodValidator } from '@tanstack/zod-adapter'
import { z } from 'zod'

import { Error } from '../../components/error'
import { Sidebar } from '../../components/sidebar'
import { SIDEBAR_WIDTH } from '../../constants'

const searchParamsSchema = z.object({
  cityCode: z.coerce.number(),
  stateCode: z.string(),
  size: z.enum(['SMALL', 'MEDIUM', 'BIG']).optional(),
  type: z
    .enum(['DOG_AND_CAT', 'DOG', 'CAT', 'OTHER'])
    .default('DOG_AND_CAT')
    .optional(),
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
  return (
    <div className="relative size-full">
      <Sidebar />

      <div
        style={{
          marginLeft: `${SIDEBAR_WIDTH}px`,
        }}
        className="flex-1"
      >
        conteúdo
      </div>
    </div>
  )
}
