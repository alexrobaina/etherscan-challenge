import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'

import { getEtherExcangeRate } from '../api/ether'

export const useGetEtherExchangeRate = () => {
  const queryClient = useQueryClient()

  const { data, mutate, isLoading, reset } = useMutation(getEtherExcangeRate, {
    onSuccess: async () => {
      toast.success('Get exchange successfully')
      await queryClient.invalidateQueries(['address'])
    },
    onError: (error: unknown) => {
      toast.error('🙈 Something is wrong!')
      console.log(error)
    },
  })

  return { mutate, isLoading, data, reset }
}
