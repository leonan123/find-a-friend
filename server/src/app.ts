import fastifyJWT from '@fastify/jwt'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUI from '@fastify/swagger-ui'
import fastify from 'fastify'
import {
  hasZodFastifySchemaValidationErrors,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'

import { env } from './env'
import { authRoutes } from './http/routes/auth'
import { orgRoutes } from './http/routes/orgs'
import { petRoutes } from './http/routes/pets'

export const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.setErrorHandler((err, _, reply) => {
  if (hasZodFastifySchemaValidationErrors(err)) {
    return reply.status(400).send({
      message: 'Validation error.',
      issues: err.validation.flatMap((issue) => issue.params.issue),
    })
  }

  console.error(err)

  return reply.status(500).send({
    message: 'Internal server error',
  })
})

app.register(fastifyJWT, {
  secret: env.JWT_SECRET,
})

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Find a Friend API',
      description: 'API for Find a Friend',
      version: '1.0.0',
    },
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUI, {
  routePrefix: '/docs',
})

app.register(authRoutes, { prefix: 'auth' })
app.register(orgRoutes, { prefix: 'orgs' })
app.register(petRoutes, { prefix: 'pets' })
