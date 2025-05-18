import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'

import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { makeFetchPetUseCase } from '@/use-cases/pet/factories/make-fetch-pet-use-case'

export const fetchPet: FastifyPluginAsyncZod = async (app) => {
  app.get(
    '',
    {
      onRequest: [verifyJWT],
      schema: {
        tags: ['Pets'],
        description: 'Fetch pets',
        querystring: z.object({
          cityCode: z.string(),
          stateCode: z.string(),
          size: z.enum(['SMALL', 'MEDIUM', 'BIG']).optional(),
          type: z.enum(['DOG_AND_CAT', 'DOG', 'CAT', 'OTHER']),
          lifeStage: z.enum(['PUPPY', 'ADULT', 'SENIOR']).optional(),
          energyLevel: z
            .enum(['LOW', 'MEDIUM', 'HIGH', 'VERY_HIGH'])
            .optional(),
          independenceLevel: z
            .enum(['LOW', 'MEDIUM', 'HIGH', 'VERY_HIGH'])
            .optional(),
          page: z.coerce.number(),
          perPage: z.coerce.number(),
        }),
        response: {
          200: z.object({
            pets: z.array(
              z.object({
                id: z.string(),
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
                independenceLevel: z.enum([
                  'LOW',
                  'MEDIUM',
                  'HIGH',
                  'VERY_HIGH',
                ]),
                requirements: z
                  .array(
                    z.object({
                      id: z.number(),
                      description: z.string(),
                    }),
                  )
                  .optional(),
                createdAt: z.date(),
                updatedAt: z.date(),
              }),
            ),
            total: z.number(),
          }),
          404: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (req, reply) => {
      const orgId = req.user.sub
      const filters = {
        ...req.query,
        orgId,
      }

      const fetchPetUseCase = makeFetchPetUseCase()

      const { pets, total } = await fetchPetUseCase.execute(filters)

      reply.status(200).send({
        pets,
        total,
      })
    },
  )
}
