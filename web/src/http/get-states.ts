import ky from 'ky'

import type { State } from '../@types'

export interface GetStatesResponse {
  states: State[]
}

export async function getStates(): Promise<GetStatesResponse> {
  const states = await ky
    .get<
      State[]
    >('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome')
    .json()

  return {
    states,
  }
}
