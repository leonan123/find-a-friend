import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/organizations'
import { InMemoryPetRepository } from '@/repositories/in-memory/pets'
import type { OrganizationRepository } from '@/repositories/organizations'
import type { PetRepository } from '@/repositories/pets'

import {
  CreatePetUseCase,
  type CreatePetUseCaseRequest,
} from './create.use-case'

let organizationsRepository: OrganizationRepository
let petRepository: PetRepository
let sut: CreatePetUseCase

describe('Create pet use case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    petRepository = new InMemoryPetRepository()
    sut = new CreatePetUseCase(organizationsRepository, petRepository)
  })

  it('should be able to create an pet', async () => {
    const organization = {
      id: 'org-01',
      responsibleName: 'John Doe',
      email: 'jRj5o@example.com',
      zipCode: '12345678',
      neighborhood: 'Neighborhood 1',
      IBGECityCode: '123456',
      stateCode: 'RS',
      address: 'Street 1',
      whatsapp: '123456789',
      passwordHash: '123456',
    }

    await organizationsRepository.create(organization)

    const pet: CreatePetUseCaseRequest = {
      orgId: organization.id,
      name: 'Pet 1',
      about: null,
      lifeStage: 'ADULT',
      type: 'DOG',
      size: 'MEDIUM',
      energyLevel: 'MEDIUM',
      independenceLevel: 'MEDIUM',
      idealEnvironment: 'SMALL',
      requirements: [
        {
          description: 'requirement 1',
        },
        {
          description: 'requirement 2',
        },
      ],
    }

    await expect(sut.execute(pet)).resolves.toBeUndefined()
  })

  it('should not be able to create an pet without existing organization', async () => {
    const pet: CreatePetUseCaseRequest = {
      orgId: 'org-01',
      name: 'Pet 1',
      about: null,
      lifeStage: 'ADULT',
      type: 'DOG',
      size: 'MEDIUM',
      energyLevel: 'MEDIUM',
      independenceLevel: 'MEDIUM',
      idealEnvironment: 'SMALL',
      requirements: [
        {
          description: 'requirement 1',
        },
        {
          description: 'requirement 2',
        },
      ],
    }

    await expect(sut.execute(pet)).rejects.toBeInstanceOf(Error)
  })
})
