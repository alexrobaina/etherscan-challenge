import { useQuery } from 'react-query'

import { getAddresses } from '../api/address'

export const useGetAddresses = ({
  page,
  search,
  address,
}: {
  page: number
  search?: string
  address: string
}) => {
  const { data, error, isLoading, refetch } = useQuery(
    ['address', search, address, page],
    () => getAddresses({ search, address, page }),
  )

  return { data, error, isLoading, refetch }
}
