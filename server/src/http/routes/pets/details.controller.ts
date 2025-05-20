import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { ResourceNotFoundError } from '@/errors/resource-not-found-error'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { makePetDetailsUseCase } from '@/use-cases/pet/factories/make-details-pet-use-case'

export const details: FastifyPluginAsyncZod = async (app) => {
  app.get(
    '/:petId',
    {
      onRequest: [verifyJWT],
      schema: {
        tags: ['Pets'],
        description: 'Fetch pet details',
        params: z.object({
          petId: z.string(),
        }),
        response: {
          200: z.object({
            pet: z.object({
              id: z.string(),
              orgId: z.string(),
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
                  id: z.number(),
                  description: z.string(),
                }),
              ),
              photos: z.array(
                z.object({
                  id: z.string(),
                  imageUrl: z.string(),
                }),
              ),
            }),
          }),
          404: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (req, reply) => {
      const orgId = req.user.sub
      const { petId } = req.params

      const petDetailsUseCase = makePetDetailsUseCase()

      try {
        const { pet } = await petDetailsUseCase.execute({
          petId,
          orgId,
        })

        reply.status(200).send({
          pet,
        })
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
