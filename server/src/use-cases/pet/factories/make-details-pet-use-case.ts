import { PrismaPetRepository } from '@/repositories/prisma/pets'

import { PetDetailsUseCase } from '../details.use-case'

export function makePetDetailsUseCase() {
  const petsRepository = new PrismaPetRepository()
  const useCase = new PetDetailsUseCase(petsRepository)

  return useCase
}
