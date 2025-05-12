import type { FastifyInstance } from 'fastify'
import { create, createOrgSchema } from './create'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

export async function orgRoutes(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post('/', createOrgSchema, create)
}
