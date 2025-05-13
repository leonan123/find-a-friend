import { hash } from 'bcryptjs'

import { EmailAlreadyExists } from '@/errors/email-already-exists'
import type { OrganizationRepository } from '@/repositories/organizations'

export type CreateOrgUseCaseRequest = {
  responsibleName: string
  email: string
  zipCode: string
  address: string
  whatsapp: string
  password: string
}

export class CreateOrgUseCase {
  constructor(private organizationRepository: OrganizationRepository) {}

  async execute(data: CreateOrgUseCaseRequest) {
    const { responsibleName, email, zipCode, address, whatsapp, password } =
      data

    const emailAlreadyExists = await this.organizationRepository.findByEmail(
      email,
    )

    if (emailAlreadyExists) {
      throw new EmailAlreadyExists()
    }

    const passwordHash = await hash(password, 6)

    await this.organizationRepository.create({
      responsibleName,
      email,
      zipCode,
      address,
      whatsapp,
      passwordHash,
    })
  }
}
