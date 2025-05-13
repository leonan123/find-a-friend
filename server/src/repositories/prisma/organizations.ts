import type { Prisma } from 'prisma/generated/prisma'

import { prisma } from '@/lib/prisma'

import type { OrganizationRepository } from '../organizations'

export class PrismaOrganizationRepository implements OrganizationRepository {
  async create(data: Prisma.OrganizationsCreateWithoutPetsInput) {
    const org = await prisma.organizations.create({ data })

    return org
  }

  async findByEmail(email: string) {
    const org = await prisma.organizations.findUnique({
      where: { email },
    })

    return org
  }
}
