import { beforeEach, describe, expect, it } from 'vitest'

import { ResourceNotFoundError } from '@/errors/resource-not-found-error'
import { InMemoryPetRepository } from '@/repositories/in-memory/pets'
import type { PetRepository, PetsCreateInput } from '@/repositories/pets'

import { PetDetailsUseCase } from './details.use-case'

let petRepository: PetRepository
let sut: PetDetailsUseCase

describe('Pet details use case', () => {
  beforeEach(() => {
    petRepository = new InMemoryPetRepository()
    sut = new PetDetailsUseCase(petRepository)
  })

  it('should be able to get details of a pet', async () => {
    const petData: PetsCreateInput = {
      id: 'pet-01',
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
        { description: 'requirement 1' },
        { description: 'requirement 2' },
      ],
      photos: [
        {
          id: 'photo-01',
          imageUrl: 'http://example.com/photo-01.jpg',
        },
      ],
    }

    await petRepository.create(petData)

    const { pet } = await sut.execute({
      petId: petData.id!,
      orgId: petData.orgId,
    })

    expect(pet).toEqual(
      expect.objectContaining({
        id: pet.id,
        orgId: pet.orgId,
        name: pet.name,
        requirements: expect.arrayContaining([
          expect.objectContaining({
            description: expect.any(String),
          }),
          expect.objectContaining({
            description: expect.any(String),
          }),
        ]),
        photos: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            imageUrl: expect.any(String),
          }),
        ]),
      }),
    )
  })

  it('should not be able to get details of a pet that does not exist', async () => {
    await expect(
      sut.execute({
        petId: 'pet-01',
        orgId: 'org-01',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
