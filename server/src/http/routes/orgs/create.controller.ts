import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'

import { EmailAlreadyExistsError } from '@/errors/email-already-exists-error'
import { makeCreateOrgUseCase } from '@/use-cases/org/factories/make-create-org-use-case'

export const create: FastifyPluginAsyncZod = async (app) => {
  app.post(
    '',
    {
      schema: {
        tags: ['Organizations'],
        description: 'Create an organization',
        body: z.object({
          responsibleName: z.string(),
          email: z.string().email(),
          zipCode: z.string(),
          address: z.string(),
          whatsapp: z.string(),
          password: z.string(),
        }),
        response: {
          201: z.null(),
          409: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (req, reply) => {
      const { responsibleName, email, zipCode, address, whatsapp, password } =
        req.body

      const createOrgUseCase = makeCreateOrgUseCase()

      try {
        await createOrgUseCase.execute({
          responsibleName,
          email,
          zipCode,
          address,
          whatsapp,
          password,
        })

        return reply.status(201).send()
      } catch (err) {
        if (err instanceof EmailAlreadyExistsError) {
          return reply.status(409).send({
            message: err.message,
          })
        }

        throw err
      }
    },
  )
}
