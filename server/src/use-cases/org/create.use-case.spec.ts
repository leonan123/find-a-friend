import { beforeEach, describe, expect, it } from 'vitest'

import { EmailAlreadyExistsError } from '@/errors/email-already-exists-error'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/organizations'
import type { OrganizationRepository } from '@/repositories/organizations'

import { CreateOrgUseCase } from './create.use-case'

let organizationsRepository: OrganizationRepository
let sut: CreateOrgUseCase

describe('Create organization use case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    sut = new CreateOrgUseCase(organizationsRepository)
  })

  it('should be able to create an organization', async () => {
    const organization = {
      responsibleName: 'John Doe',
      email: 'jRj5o@example.com',
      zipCode: '12345678',
      neighborhood: 'Neighborhood 1',
      IBGECityCode: '123456',
      stateCode: 'RS',
      address: 'Street 1',
      whatsapp: '123456789',
      password: '123456',
    }

    await expect(sut.execute(organization)).resolves.toBeUndefined()
  })

  it('should not be able to create an organization with same email', async () => {
    const organization = {
      responsibleName: 'John Doe',
      email: 'jRj5o@example.com',
      zipCode: '12345678',
      neighborhood: 'Neighborhood 1',
      IBGECityCode: '123456',
      stateCode: 'RS',
      address: 'Street 1',
      whatsapp: '123456789',
      password: '123456',
    }

    await sut.execute(organization)

    await expect(sut.execute(organization)).rejects.toBeInstanceOf(
      EmailAlreadyExistsError,
    )
  })
})
