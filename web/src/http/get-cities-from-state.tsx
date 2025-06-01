import ky from 'ky'

import type { City } from '../@types'

interface GetCitiesFromStateResponse {
  cities: City[]
}

export async function getCitiesFromState(
  state: string,
): Promise<GetCitiesFromStateResponse> {
  const cities = await ky
    .get<
      City[]
    >(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state}/municipios?orderBy=nome`)
    .json()

  return {
    cities,
  }
}
