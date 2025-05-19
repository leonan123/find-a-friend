import type { Pets, Prisma } from 'generated/prisma'

import type { FetchPetUseCaseRequest } from '@/use-cases/pet/fetch-pet.use-case'

import type { PetRepository, PetsCreateInput } from '../pets'

type Pet = Prisma.PetsGetPayload<{
  include: {
    requirements: {
      select: {
        id: true
        description: true
      }
    }
  }
}>

export class InMemoryPetRepository implements PetRepository {
  private pets: Pets[] = []

  async create(data: PetsCreateInput) {
    const requirements = data.requirements?.map((requirement, i) => ({
      id: requirement.id ?? i + 1,
      description: requirement.description,
    }))

    const pet: Pet = {
      id: data.id ?? 'pet-01',
      name: data.name,
      about: data.about ?? null,
      size: data.size,
      type: data.type,
      lifeStage: data.lifeStage,
      idealEnvironment: data.idealEnvironment,
      energyLevel: data.energyLevel,
      independenceLevel: data.independenceLevel,
      isAdopted: false,
      orgId: data.orgId,
      createdAt: new Date(),
      updatedAt: new Date(),
      requirements: requirements ?? [],
    }

    this.pets.push(pet)

    return pet
  }

  async findMany(filters: FetchPetUseCaseRequest) {
    const pets = this.pets.slice(
      (filters.page - 1) * filters.perPage,
      filters.perPage + (filters.page - 1) * filters.perPage,
    )

    return pets
  }
}
