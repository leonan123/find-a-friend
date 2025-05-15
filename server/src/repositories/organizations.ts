import type { Organizations, Prisma } from 'generated/prisma'

export interface OrganizationRepository {
  create(
    data: Prisma.OrganizationsCreateWithoutPetsInput,
  ): Promise<Organizations>

  findByEmail(email: string): Promise<Organizations | null>
}
