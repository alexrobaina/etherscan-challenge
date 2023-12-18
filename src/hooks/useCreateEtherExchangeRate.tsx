import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'

import { create } from '../api/etherExchangeRate'

export const useCreateEtherExchangeRate = () => {
  const queryClient = useQueryClient()

  const {
    data,
    isLoading,
    mutate: mutateCreateEtherExchange,
  } = useMutation(create, {
    onSuccess: async () => {
      toast.success('Exchange Rate create successfully')
      await queryClient.invalidateQueries(['etherExchangeRate'])
    },
    onError: (error: unknown) => {
      toast.error('🙈 Something is wrong!')
      console.log(error)
    },
  })

  return { data, mutateCreateEtherExchange, isLoading }
}
