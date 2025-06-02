import { useQuery } from '@tanstack/react-query'
import { useSearch } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

import type { City } from '@/@types'
import { getCitiesFromState } from '@/http/get-cities-from-state'
import { getStates } from '@/http/get-states'

export function useCitiesByState() {
  const searchParams = useSearch({
    strict: false,
  })

  const [cities, setCities] = useState<City[]>([])

  const { data, isLoading } = useQuery({
    queryKey: ['states'],
    queryFn: getStates,
    staleTime: Infinity,
  })

  async function onStateChange(value: string) {
    const response = await getCitiesFromState(value)
    setCities(response.cities)
  }

  useEffect(() => {
    if (searchParams.stateCode) {
      onStateChange(searchParams.stateCode)
    }
  }, [searchParams.stateCode])

  return {
    states: data?.states ?? [],
    isLoadingStates: isLoading,
    cities,
    onStateChange,
  }
}
