import { PrismaPetRepository } from '@/repositories/prisma/pets'

import { FetchPetUseCase } from '../fetch-pet.use-case'

export function makeFetchPetUseCase() {
  const petsRepository = new PrismaPetRepository()
  const useCase = new FetchPetUseCase(petsRepository)

  return useCase
}
