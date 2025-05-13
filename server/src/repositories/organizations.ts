import type { Organizations, Prisma } from 'prisma/generated/prisma'

export interface OrganizationRepository {
  create(
    data: Prisma.OrganizationsCreateWithoutPetsInput,
  ): Promise<Organizations>

  findByEmail(email: string): Promise<Organizations | null>
}
