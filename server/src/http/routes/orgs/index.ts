import type { FastifyTypedInstance } from '@/@types/fastify'

import { create } from './create.controller'

export async function orgRoutes(app: FastifyTypedInstance) {
  app.register(create)
}
