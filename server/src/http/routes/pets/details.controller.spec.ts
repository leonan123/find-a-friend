import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateOrganization } from '@/utils/test/create-and-authenticate-organization'

describe('Details pet controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get details of an pet', async () => {
    const { token } = await createAndAuthenticateOrganization(app)

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Pet 1',
        about: 'About pet 1',
        size: 'SMALL',
        type: 'DOG',
        lifeStage: 'PUPPY',
        idealEnvironment: 'INDOOR',
        energyLevel: 'LOW',
        independenceLevel: 'LOW',
        requirements: [
          {
            description: 'Requirement 1',
          },
        ],
      })

    const createdPet = await prisma.pets.findFirst()

    const response = await request(app.server)
      .get(`/pets/${createdPet?.id}`)
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toEqual(200)
    expect(response.body.pet).toEqual(
      expect.objectContaining({ id: createdPet?.id }),
    )
  })
})
