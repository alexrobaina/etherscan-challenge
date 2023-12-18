import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'

import { update } from '../api/address'

export const useUpdateAddress = () => {
  const queryClient = useQueryClient()

  const { mutate, isLoading } = useMutation(update, {
    onSuccess: async () => {
      toast.success('Address update successfully')
      await queryClient.invalidateQueries(['address'])
    },
    onError: (error: unknown) => {
      toast.error('🙈 Something is wrong!')
      console.log(error)
    },
  })

  return { mutate, isLoading }
}
