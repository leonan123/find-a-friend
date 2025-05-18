import type { FastifyTypedInstance } from '@/@types/fastify'

import { create } from './create.controller'
import { fetchPet } from './fetch-pet.controller'

export async function petRoutes(app: FastifyTypedInstance) {
  app.register(create)
  app.register(fetchPet)
}
