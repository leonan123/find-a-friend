import { compare } from 'bcryptjs'
import type { Organizations } from 'generated/prisma'

import { InvalidCredentialsError } from '@/errors/invalid-credentials-error'
import type { OrganizationRepository } from '@/repositories/organizations'

export interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateUseCaseResponse {
  organization: Organizations
}

export class AuthenticateUseCase {
  constructor(private organizationRepository: OrganizationRepository) {}

  async execute(
    data: AuthenticateUseCaseRequest,
  ): Promise<AuthenticateUseCaseResponse> {
    const organization = await this.organizationRepository.findByEmail(
      data.email,
    )

    const isPasswordCorrect =
      organization && (await compare(data.password, organization.passwordHash))

    if (!organization || !isPasswordCorrect) {
      throw new InvalidCredentialsError()
    }

    return {
      organization,
    }
  }
}
