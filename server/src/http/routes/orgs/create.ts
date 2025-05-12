import type {
  FastifyReply,
  FastifyRequest,
  RouteShorthandOptions,
} from 'fastify'

import { z } from 'zod'

export const createOrgSchema: RouteShorthandOptions = {
  schema: {
    tags: ['orgs'],
    description: 'Create org',
    body: z.object({
      responsibleName: z.string(),
      // email: z.string(),
      // zipCode: z.string(),
      // address: z.string(),
      // whatsapp: z.string(),
      // password: z.string(),
    }),
  },
}

export async function create(req: FastifyRequest, reply: FastifyReply) {
  const body = req.body

  console.log(body)
  reply.status(201).send()
}
