import type { FastifyTypedInstance } from '@/@types/fastify'

import { authenticate } from './authenticate.controller'

export async function authRoutes(app: FastifyTypedInstance) {
  app.register(authenticate)
}
