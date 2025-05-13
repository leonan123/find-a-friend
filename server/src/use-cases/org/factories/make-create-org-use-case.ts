import { PrismaOrganizationRepository } from '@/repositories/prisma/organizations'

import { CreateOrgUseCase } from '../create.use-case'

export function makeCreateOrgUseCase() {
  const organizationsRepository = new PrismaOrganizationRepository()
  const createOrgUseCase = new CreateOrgUseCase(organizationsRepository)

  return createOrgUseCase
}
