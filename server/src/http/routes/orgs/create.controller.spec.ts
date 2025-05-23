import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'

describe('Create organization controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create an organization', async () => {
    const response = await request(app.server).post('/orgs').send({
      responsibleName: 'John Doe',
      email: 'V4V5T@example.com',
      zipCode: '12345678',
      neighborhood: 'Neighborhood 1',
      IBGECityCode: '1234567',
      stateCode: 'RS',
      address: 'Address 1',
      whatsapp: '123456789',
      password: '123456',
    })

    expect(response.statusCode).toEqual(201)
  })
})
