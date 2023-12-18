import { createContext } from 'react'

export interface User {
  id: string
  email: string
}

export interface AppContextProps {
  session: { token: string } | null
  user: User | null
}

const warning: AppContextProps = {
  get session(): { token: string } {
    console.warn('Accessed context.session without context provider.')
    throw new Error('Accessed context.session without context provider.')
  },
  get user(): User {
    console.warn('Accessed context.user without context provider.')
    throw new Error('Accessed context.user without context provider.')
  },
}

export const AppContext = createContext<AppContextProps>(warning)
