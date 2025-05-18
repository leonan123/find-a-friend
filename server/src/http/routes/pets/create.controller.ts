import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'

import { ResourceNotFoundError } from '@/errors/resource-not-found-error'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { makeCreatePetUseCase } from '@/use-cases/pet/factories/make-create-pet-use-case'

export const create: FastifyPluginAsyncZod = async (app) => {
  app.post(
    '',
    {
      onRequest: [verifyJWT],
      schema: {
        tags: ['Pets'],
        description: 'Create a pet',
        body: z.object({
          name: z.string(),
          about: z.string().nullable(),
          size: z.enum(['SMALL', 'MEDIUM', 'BIG']),
          type: z.enum(['DOG', 'CAT', 'OTHER']),
          lifeStage: z.enum(['PUPPY', 'ADULT', 'SENIOR']),
          idealEnvironment: z.enum([
            'INDOOR',
            'OUTDOOR',
            'SMALL',
            'SPACIOUS',
            'WITH_YARD',
            'APARTMENT',
          ]),
          energyLevel: z.enum(['LOW', 'MEDIUM', 'HIGH', 'VERY_HIGH']),
          independenceLevel: z.enum(['LOW', 'MEDIUM', 'HIGH', 'VERY_HIGH']),
          requirements: z.array(
            z.object({
              description: z.string(),
            }),
          ),
        }),
        response: {
          201: z.null(),
          404: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (req, reply) => {
      const orgId = req.user.sub
      const data = req.body

      const createPetUseCase = makeCreatePetUseCase()

      try {
        await createPetUseCase.execute({ ...data, orgId })

        return reply.status(201).send()
      } catch (err) {
        if (err instanceof ResourceNotFoundError) {
          return reply.status(404).send({
            message: err.message,
          })
        }

        throw err
      }
    },
  )
}
