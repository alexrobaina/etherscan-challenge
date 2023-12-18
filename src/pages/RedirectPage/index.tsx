import { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export const RedirectPage: FC = () => {
  const navigate = useNavigate()

  useEffect(() => {
    toast.error('Page not found.')
    navigate('/dashboard')
  }, [navigate])

  return null
}
