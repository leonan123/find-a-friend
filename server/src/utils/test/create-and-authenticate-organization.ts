import { hash } from 'bcryptjs'
import request from 'supertest'

import type { FastifyTypedInstance } from '@/@types/fastify'
import { prisma } from '@/lib/prisma'

export async function createAndAuthenticateOrganization(
  app: FastifyTypedInstance,
) {
  await prisma.organizations.deleteMany()

  const organization = await prisma.organizations.create({
    data: {
      responsibleName: 'John Doe',
      email: 'V4V5T@example.com',
      zipCode: '12345678',
      neighborhood: 'Neighborhood 1',
      IBGECityCode: '1234567',
      stateCode: 'RS',
      address: 'Address 1',
      whatsapp: '123456789',
      passwordHash: await hash('123456', 6),
    },
  })

  const authResponse = await request(app.server).post('/auth/login').send({
    email: 'V4V5T@example.com',
    password: '123456',
  })

  const token = authResponse.body.token

  return {
    organization,
    token,
  }
}
