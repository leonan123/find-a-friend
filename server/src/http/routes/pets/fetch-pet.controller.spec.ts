import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { createAndAuthenticateOrganization } from '@/utils/test/create-and-authenticate-organization'

describe('Fetch pet controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to list pets', async () => {
    const { token, organization } = await createAndAuthenticateOrganization(app)

    for (let i = 0; i < 5; i++) {
      await request(app.server)
        .post('/pets')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: `Pet ${i}`,
          about: 'About pet 1',
          size: 'SMALL',
          type: 'DOG',
          lifeStage: 'PUPPY',
          idealEnvironment: 'INDOOR',
          energyLevel: 'LOW',
          independenceLevel: 'LOW',
          requirements: [{ description: 'Requirement 1' }],
        })
    }

    for (let i = 0; i < 5; i++) {
      await request(app.server)
        .post('/pets')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: `Pet ${i}`,
          about: 'About pet 1',
          size: 'SMALL',
          type: 'CAT',
          lifeStage: 'PUPPY',
          idealEnvironment: 'INDOOR',
          energyLevel: 'LOW',
          independenceLevel: 'LOW',
          requirements: [{ description: 'Requirement 1' }],
        })
    }

    const response = await request(app.server).get('/pets').query({
      page: 1,
      perPage: 20,
      cityCode: organization.IBGECityCode,
      stateCode: organization.stateCode,
      type: 'DOG_AND_CAT',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets).toHaveLength(10)
    expect(response.body.total).toEqual(10)
    expect(response.body.pets).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ type: 'DOG' }),
        expect.objectContaining({ type: 'CAT' }),
      ]),
    )
  })

  it('should be able to list paginated pets ', async () => {
    const { token, organization } = await createAndAuthenticateOrganization(app)

    for (let i = 0; i < 10; i++) {
      await request(app.server)
        .post('/pets')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: `Pet ${i}`,
          about: 'About pet 1',
          size: 'SMALL',
          type: 'DOG',
          lifeStage: 'PUPPY',
          idealEnvironment: 'INDOOR',
          energyLevel: 'LOW',
          independenceLevel: 'LOW',
          requirements: [{ description: 'Requirement 1' }],
        })
    }

    const response = await request(app.server).get('/pets').query({
      page: 1,
      perPage: 5,
      cityCode: organization.IBGECityCode,
      stateCode: organization.stateCode,
      type: 'DOG',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets).toHaveLength(5)

    const response2 = await request(app.server).get('/pets').query({
      page: 2,
      perPage: 5,
      cityCode: organization.IBGECityCode,
      stateCode: organization.stateCode,
      type: 'DOG',
    })

    expect(response2.statusCode).toEqual(200)
    expect(response2.body.pets).toHaveLength(5)
  })
})
