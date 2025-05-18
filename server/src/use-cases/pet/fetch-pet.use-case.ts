import type { $Enums } from 'generated/prisma'

import type { PetRepository } from '@/repositories/pets'

interface FetchPetUseCaseRequest {
  cityCode: string
  stateCode: string
  type: $Enums.PetType | 'DOG_AND_CAT'
  lifeStage?: $Enums.LifeStage
  size?: $Enums.PetSize
  energyLevel?: $Enums.PetEnergyLevel
  independenceLevel?: $Enums.PetIndependenceLevel
  page: number
  perPage: number
}

export class FetchPetUseCase {
  constructor(private petRepository: PetRepository) {}

  async execute(data: FetchPetUseCaseRequest) {
    const pets = await this.petRepository.findMany(data)

    return {
      total: pets.length,
      pets,
    }
  }
}
