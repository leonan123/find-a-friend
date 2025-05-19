import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryPetRepository } from '@/repositories/in-memory/pets'
import type { PetRepository, PetsCreateInput } from '@/repositories/pets'

import { FetchPetUseCase } from './fetch-pet.use-case'

let petRepository: PetRepository
let sut: FetchPetUseCase

describe('Fetch pets use case', () => {
  beforeEach(() => {
    petRepository = new InMemoryPetRepository()
    sut = new FetchPetUseCase(petRepository)
  })

  it('should be able to list pets', async () => {
    for (let i = 0; i < 10; i++) {
      const pet: PetsCreateInput = {
        orgId: 'org-01',
        name: `Pet ${i}`,
        about: null,
        lifeStage: 'ADULT',
        type: 'DOG',
        size: 'MEDIUM',
        energyLevel: 'HIGH',
        independenceLevel: 'LOW',
        idealEnvironment: 'SMALL',
      }

      await petRepository.create(pet)
    }

    const { pets, total } = await sut.execute({
      page: 1,
      perPage: 10,
      cityCode: '123456',
      stateCode: 'RS',
      type: 'DOG',
      lifeStage: 'ADULT',
      size: 'MEDIUM',
      energyLevel: 'HIGH',
      independenceLevel: 'LOW',
    })

    expect(pets).toHaveLength(10)
    expect(total).toBe(10)
  })

  it('should be able to paginate pets', async () => {
    for (let i = 0; i < 15; i++) {
      const pet: PetsCreateInput = {
        orgId: 'org-01',
        name: `Pet ${i}`,
        about: null,
        lifeStage: 'ADULT',
        type: 'DOG',
        size: 'MEDIUM',
        energyLevel: 'HIGH',
        independenceLevel: 'LOW',
        idealEnvironment: 'SMALL',
      }

      await petRepository.create(pet)
    }

    const { pets, total } = await sut.execute({
      page: 2,
      perPage: 10,
      cityCode: '123456',
      stateCode: 'RS',
      type: 'DOG',
      lifeStage: 'ADULT',
      size: 'MEDIUM',
      energyLevel: 'HIGH',
      independenceLevel: 'LOW',
    })

    expect(pets).toHaveLength(5)
    expect(total).toBe(5)
  })
})
