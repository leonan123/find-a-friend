import ky from 'ky'

import { env } from '@/env'

interface CreateOrganizationInput {
  responsibleName: string
  email: string
  zipCode: string
  neighborhood: string
  address: string
  whatsapp: string
  stateCode: string
  IBGECityCode: string
  password: string
}

interface CreateOrganizationResponse {
  success: boolean
}

export async function createOrganization(
  data: CreateOrganizationInput,
): Promise<CreateOrganizationResponse> {
  const response = await ky.post(`${env.VITE_API_URL}/orgs`, {
    json: data,
  })

  return {
    success: response.ok,
  }
}
