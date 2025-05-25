import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { createAndAuthenticateOrganization } from '@/utils/test/create-and-authenticate-organization'

describe('Create pet controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create an pet', async () => {
    const { token } = await createAndAuthenticateOrganization(app)

    const response = await request(app.server)
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

    expect(response.statusCode).toEqual(201)
  })

  it('should not be able to create an pet without authentication', async () => {
    const response = await request(app.server)
      .post('/pets')
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

    expect(response.statusCode).toEqual(401)
  })
})
