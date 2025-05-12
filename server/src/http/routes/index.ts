import type { FastifyInstance } from 'fastify'
import { orgRoutes } from './orgs'

export async function routes(app: FastifyInstance) {
  app.register(orgRoutes, { prefix: '/orgs' })
}
