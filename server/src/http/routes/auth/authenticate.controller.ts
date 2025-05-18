import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'

import { InvalidCredentialsError } from '@/errors/invalid-credentials-error'
import { makeAuthenticateUseCase } from '@/use-cases/auth/factories/make-authenticate-use-case'

export const authenticate: FastifyPluginAsyncZod = async (app) => {
  app.post(
    '/login',
    {
      schema: {
        tags: ['auth'],
        description: 'Log in with email and password',
        body: z.object({
          email: z.string().email(),
          password: z.string(),
        }),
        response: {
          200: z.object({
            token: z.string(),
          }),
          400: z.object({
            message: z.string(),
            issues: z
              .array(
                z.object({
                  message: z.string(),
                  validation: z.string(),
                  code: z.string(),
                  path: z.array(z.string()),
                }),
              )
              .optional(),
          }),
        },
      },
    },
    async (req, reply) => {
      const { email, password } = req.body

      const authenticateUseCase = makeAuthenticateUseCase()

      try {
        const { organization } = await authenticateUseCase.execute({
          email,
          password,
        })

        const token = await reply.jwtSign(
          {},
          {
            sub: organization.id,
            expiresIn: '7d',
          },
        )

        return reply.status(200).send({ token })
      } catch (err) {
        if (err instanceof InvalidCredentialsError) {
          return reply.status(400).send({ message: err.message })
        }

        throw err
      }
    },
  )
}
