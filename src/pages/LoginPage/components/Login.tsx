import { FC, ChangeEvent, useState } from 'react'

import { BaseButton } from '../../../components/common/BaseButton'
import { BaseInput } from '../../../components/common/BaseInput'
import { BaseLoading } from '../../../components/common/BaseLoading'
import { useLogin } from '../../../hooks/useLogin'
import { setCookie } from '../../../utils/setCookie'

export const Login: FC = () => {
  const { isLoading, mutate } = useLogin()
  const [email, setEmail] = useState({
    value: '',
    error: false,
    helperText: '',
  })

  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail({
      error: false,
      helperText: '',
      value: e.target.value,
    })
  }

  const handleLogin = () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/

    if (email.value === '') {
      setEmail({
        error: true,
        value: email.value,
        helperText: 'Email is required',
      })
    }

    // Validate the email format
    if (!emailRegex.test(email.value)) {
      setEmail({
        error: true,
        value: email.value,
        helperText: 'Invalid email format',
      })
    }
    mutate({ email: email.value })
    setCookie('email', email.value, 2)
  }

  if (isLoading) return <BaseLoading large />

  return (
    <div className="flex justify-center">
      <div className="z-10 flex min-h-full flex-col justify-center py-8 sm:px-6 lg:px-8">
        <div className="bg-primary-300 shadow-2xl sm:rounded-lg p-8 sm:px-12 w-[400px]">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="mb-5 text-center text-2xl font-bold leading-9 tracking-tight text-primary-900">
              Securitize
            </h2>
          </div>
          <div className="mt-3">
            <BaseInput
              type="email"
              value={email.value}
              label="Email address"
              error={email.helperText}
              placeholder="Add your email"
              handleChange={handleChangeEmail}
            />
          </div>
          <div className="mt-6 w-full">
            <BaseButton
              style="primary"
              text="Magic link"
              className="w-[300px]"
              onClick={handleLogin}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
