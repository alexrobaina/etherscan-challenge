import { useQuery } from 'react-query'

import { getAddress } from '../api/address'

export const useGetAddress = (id: string | undefined) => {
  const { data, error, isLoading } = useQuery(
    ['address', id],
    () => id && getAddress(id),
  )

  return { data, error, isLoading }
}
