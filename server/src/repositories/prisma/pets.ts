import type { Prisma } from 'generated/prisma'

import { prisma } from '@/lib/prisma'

import type { FindManyArgs, PetRepository, PetsCreateInput } from '../pets'

export class PrismaPetRepository implements PetRepository {
  async findMany(filters: FindManyArgs) {
    const pets = await prisma.pets.findMany({
      where: {
        org: {
          IBGECityCode: filters.cityCode,
          stateCode: filters.stateCode,
        },
        type: {
          in: filters.type === 'DOG_AND_CAT' ? ['DOG', 'CAT'] : [filters.type],
        },
        lifeStage: filters.lifeStage,
        size: filters.size,
        energyLevel: filters.energyLevel,
        independenceLevel: filters.independenceLevel,
      },
      skip: (filters.page - 1) * filters.perPage,
      take: filters.perPage,
      orderBy: {
        createdAt: 'asc',
      },
      include: {
        requirements: {
          select: {
            id: true,
            description: true,
          },
        },
      },
    })

    return pets
  }

  async create(data: PetsCreateInput) {
    const { requirements, photos, ...petsDataInput } = data

    const petsData: Prisma.PetsUncheckedCreateInput = {
      ...petsDataInput,
      ...(requirements && {
        requirements: {
          createMany: {
            data: requirements,
          },
        },
      }),
      ...(photos && {
        photos: {
          createMany: {
            data: photos,
          },
        },
      }),
    }

    const pet = await prisma.pets.create({
      data: petsData,
    })

    return pet
  }
}
