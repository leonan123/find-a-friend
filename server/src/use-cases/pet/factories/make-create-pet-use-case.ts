import { PrismaOrganizationRepository } from '@/repositories/prisma/organizations'
import { PrismaPetRepository } from '@/repositories/prisma/pets'

import { CreatePetUseCase } from '../create.use-case'

export function makeCreatePetUseCase() {
  const organizationsRepository = new PrismaOrganizationRepository()
  const petsRepository = new PrismaPetRepository()
  const useCase = new CreatePetUseCase(organizationsRepository, petsRepository)

  return useCase
}
