import { useMutation } from 'react-query'
import { toast } from 'react-toastify'

import { login } from '../api/login'
import { setCookie } from '../utils/setCookie'

export const useLogin = () => {
  const { mutate, isLoading } = useMutation(login, {
    onSuccess: async (data: { id: string; email: string; token: string }) => {
      setCookie('email', data.email, 2)
      setCookie('token', data.token, 2)
      window.location.replace('/dashboard')
    },
    onError: (error: unknown) => {
      toast.error('🙈 Something is wrong!')
      console.log(error)
    },
  })

  return { mutate, isLoading }
}
