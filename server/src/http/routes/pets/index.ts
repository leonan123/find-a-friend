import type { FastifyTypedInstance } from '@/@types/fastify'

import { create } from './create.controller'
import { details } from './details.controller'
import { fetchPet } from './fetch-pet.controller'

export async function petRoutes(app: FastifyTypedInstance) {
  app.register(create)
  app.register(fetchPet)
  app.register(details)
}
