import { PrismaOrganizationRepository } from '@/repositories/prisma/organizations'

import { AuthenticateUseCase } from '../authenticate.use-case'

export function makeAuthenticateUseCase() {
  const organizationsRepository = new PrismaOrganizationRepository()
  const useCase = new AuthenticateUseCase(organizationsRepository)

  return useCase
}
