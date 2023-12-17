import axios from 'axios'
import { observable } from 'mobx'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import App from './App.tsx'
import { Navbar } from './components/Navbar'
import { LoginPage } from './pages/LoginPage'
import { AppContextProps } from './services/AppContext.ts'
import { getCookie } from './utils/getCookie.ts'

import './index.css'
import 'react-toastify/dist/ReactToastify.css'

const queryClient = new QueryClient()

async function main() {
  let appContext: AppContextProps = observable({
    session: { email: '' },
    user: {
      name: 'alex',
      email: '',
    },
  })

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Navbar />,
      children: [
        {
          path: '/',
          element: <LoginPage />,
        },
        {
          path: '*',
          element: <LoginPage />,
        },
      ],
    },
  ])

  try {
    const token = getCookie('token')
    const email = getCookie('email')

    if (token) {
      appContext = observable({
        session: { token: token },
        user: {
          name: 'alex',
          email: email,
        },
      })
    } else {
      appContext = observable({
        session: { email: '' },
        user: null,
      })
      throw new Error('User not signed in')
    }
  } catch (_e) {
    console.log(3)
    ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
      <React.StrictMode>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </React.StrictMode>,
    )
    return
  }

  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <QueryClientProvider client={queryClient}>
      <App appContext={appContext} />
    </QueryClientProvider>,
  )
}

void main()
