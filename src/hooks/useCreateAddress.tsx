import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'

import { create } from '../api/address'

export const useCreateAddress = () => {
  const queryClient = useQueryClient()

  const { mutate, isLoading } = useMutation(create, {
    onSuccess: async () => {
      toast.success('Address created successfully')
      await queryClient.invalidateQueries(['address'])
    },
    onError: (error: unknown) => {
      toast.error('🙈 Something is wrong!')
      console.log(error)
    },
  })

  return { mutate, isLoading }
}
