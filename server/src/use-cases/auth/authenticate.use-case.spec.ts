import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'

import { InvalidCredentialsError } from '@/errors/invalid-credentials-error'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/organizations'
import type { OrganizationRepository } from '@/repositories/organizations'

import { AuthenticateUseCase } from './authenticate.use-case'

let organizationsRepository: OrganizationRepository
let sut: AuthenticateUseCase

describe('Authenticate organization use case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    sut = new AuthenticateUseCase(organizationsRepository)
  })

  it('should be able to authenticate', async () => {
    const organization = {
      id: 'org-01',
      responsibleName: 'John Doe',
      email: 'jRj5o@example.com',
      zipCode: '12345678',
      address: 'Street 1',
      whatsapp: '123456789',
      passwordHash: await hash('123456', 6),
    }

    await organizationsRepository.create(organization)

    const { organization: org } = await sut.execute({
      email: 'jRj5o@example.com',
      password: '123456',
    })

    expect(org.id).toEqual(organization.id)
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'jRj5o@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
