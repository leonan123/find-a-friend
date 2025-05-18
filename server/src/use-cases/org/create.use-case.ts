import { hash } from 'bcryptjs'

import { EmailAlreadyExistsError } from '@/errors/email-already-exists-error'
import type { OrganizationRepository } from '@/repositories/organizations'

export type CreateOrgUseCaseRequest = {
  responsibleName: string
  email: string
  zipCode: string
  neighborhood: string
  IBGECityCode: string
  stateCode: string
  address: string
  whatsapp: string
  password: string
}

export type CreateOrgUseCaseResponse = void

export class CreateOrgUseCase {
  constructor(private organizationRepository: OrganizationRepository) {}

  async execute(data: CreateOrgUseCaseRequest) {
    const {
      responsibleName,
      email,
      zipCode,
      neighborhood,
      IBGECityCode,
      stateCode,
      address,
      whatsapp,
      password,
    } = data

    const emailAlreadyExists = await this.organizationRepository.findByEmail(
      email,
    )

    if (emailAlreadyExists) {
      throw new EmailAlreadyExistsError()
    }

    const passwordHash = await hash(password, 6)

    await this.organizationRepository.create({
      responsibleName,
      email,
      zipCode,
      neighborhood,
      IBGECityCode,
      stateCode,
      address,
      whatsapp,
      passwordHash,
    })
  }
}
