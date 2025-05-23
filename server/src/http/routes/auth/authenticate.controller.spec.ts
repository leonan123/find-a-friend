import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'

describe('Authenticate organization controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate', async () => {
    await request(app.server).post('/orgs').send({
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

    const response = await request(app.server).post('/auth/login').send({
      email: 'V4V5T@example.com',
      password: '123456',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toHaveProperty('token')
  })
})
