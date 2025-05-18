import type { $Enums, Pets, Prisma } from 'generated/prisma'

export type PetsCreateInput = Omit<
  Prisma.PetsUncheckedCreateInput,
  'requirements' | 'photos'
> & {
  requirements?: Omit<
    Prisma.AdoptionRequirementsUncheckedCreateInput,
    'petId'
  >[]
  photos?: Prisma.PetPhotosCreateManyInput[]
}

export interface FindManyArgs {
  cityCode: string
  stateCode: string
  type: $Enums.PetType | 'DOG_AND_CAT'
  lifeStage?: $Enums.LifeStage
  size?: $Enums.PetSize
  energyLevel?: $Enums.PetEnergyLevel
  independenceLevel?: $Enums.PetIndependenceLevel
  page: number
  perPage: number
}

export interface PetRepository {
  create(data: PetsCreateInput): Promise<Pets>
  findMany(filters: FindManyArgs): Promise<Pets[]>
}
