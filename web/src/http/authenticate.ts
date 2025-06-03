import ky from 'ky'

import { env } from '@/env'

interface AuthenticateInput {
  email: string
  password: string
}

interface AuthenticateResponse {
  token: string
}

export async function authenticate(data: AuthenticateInput) {
  const response = await ky
    .post<AuthenticateResponse>(`${env.VITE_API_URL}/auth/login`, {
      json: data,
    })
    .json()

  return {
    token: response.token,
  }
}
