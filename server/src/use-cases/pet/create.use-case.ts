import { ResourceNotFoundError } from '@/errors/resource-not-found-error'
import type { OrganizationRepository } from '@/repositories/organizations'
import type { PetRepository } from '@/repositories/pets'

type PetLifeStage = 'PUPPY' | 'ADULT' | 'SENIOR'

type PetType = 'DOG' | 'CAT' | 'OTHER'
type PetSize = 'SMALL' | 'MEDIUM' | 'BIG'
type PetEnergyLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'VERY_HIGH'
type PetIndependenceLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'VERY_HIGH'
type PetIdealEnvironment =
  | 'SPACIOUS'
  | 'SMALL'
  | 'INDOOR'
  | 'OUTDOOR'
  | 'WITH_YARD'
  | 'APARTMENT'

type AdoptionRequirements = {
  description: string
}

export type CreatePetUseCaseRequest = {
  orgId: string
  name: string
  about?: string | null
  lifeStage: PetLifeStage
  type: PetType
  size: PetSize
  independenceLevel: PetIndependenceLevel
  energyLevel: PetEnergyLevel
  idealEnvironment: PetIdealEnvironment
  requirements?: AdoptionRequirements[]
}

export class CreatePetUseCase {
  constructor(
    private organizationRepository: OrganizationRepository,
    private petRepository: PetRepository,
  ) {}

  async execute(data: CreatePetUseCaseRequest) {
    const { orgId } = data

    const organization = await this.organizationRepository.findById(orgId)

    if (!organization) {
      throw new ResourceNotFoundError('Organization not found.')
    }

    await this.petRepository.create(data)
  }
}
