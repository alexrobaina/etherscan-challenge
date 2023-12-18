import { useQuery } from 'react-query'

import { getAddress } from '../api/address'

export const useGetAddress = (address: string | undefined) => {
  const { data, error, isLoading } = useQuery(
    ['address', address],
    () => address && getAddress(address),
  )

  return { data, error, isLoading }
}
