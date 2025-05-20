import { ResourceNotFoundError } from '@/errors/resource-not-found-error'
import type { PetRepository } from '@/repositories/pets'

interface PetDetailsUseCaseRequest {
  petId: string
  orgId: string
}

export class PetDetailsUseCase {
  constructor(private petRepository: PetRepository) {}

  async execute(data: PetDetailsUseCaseRequest) {
    const { petId, orgId } = data

    const pet = await this.petRepository.findById(petId, orgId)

    if (!pet) {
      throw new ResourceNotFoundError('Pet not found.')
    }

    return {
      pet,
    }
  }
}
