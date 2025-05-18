import type { FastifyTypedInstance } from '@/@types/fastify'

import { create } from './create.controller'

export async function petRoutes(app: FastifyTypedInstance) {
  app.register(create)
}
