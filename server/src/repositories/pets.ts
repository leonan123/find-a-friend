import type { Pets, Prisma } from 'generated/prisma'

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

export interface PetRepository {
  create(data: PetsCreateInput): Promise<Pets>
}
