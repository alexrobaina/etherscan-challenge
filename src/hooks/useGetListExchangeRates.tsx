import { useQuery } from 'react-query'

import { getAllExchangeRates } from '../api/ether'

export const useGetListExchangeRates = (addressId: string | undefined) => {
  const { data, error, isLoading } = useQuery(
    ['etherExchangeRate', addressId],
    () => addressId && getAllExchangeRates(addressId),
  )

  return { data, error, isLoading }
}
