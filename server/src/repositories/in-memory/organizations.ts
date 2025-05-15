import type { Organizations, Prisma } from 'generated/prisma'

import type { OrganizationRepository } from '../organizations'

export class InMemoryOrganizationsRepository implements OrganizationRepository {
  private organizations: Organizations[] = []

  async create(data: Prisma.OrganizationsCreateWithoutPetsInput) {
    const org = {
      id: data.id ?? 'org-01',
      responsibleName: data.responsibleName,
      email: data.email,
      zipCode: data.zipCode,
      address: data.address,
      whatsapp: data.whatsapp,
      passwordHash: data.passwordHash,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.organizations.push(org)

    return org
  }

  async findByEmail(email: string) {
    const org = this.organizations.find((org) => org.email === email) ?? null

    return org
  }
}
