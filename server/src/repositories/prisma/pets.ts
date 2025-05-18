import type { Prisma } from 'generated/prisma'

import { prisma } from '@/lib/prisma'

import type { PetRepository, PetsCreateInput } from '../pets'

export class PrismaPetRepository implements PetRepository {
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
