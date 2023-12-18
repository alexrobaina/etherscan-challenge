import { observer } from 'mobx-react'
import { FC } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import Navigation from './components/Navigation'
import { AddressPage } from './pages/AddressPage'
import { DashboardPage } from './pages/DashboardPage'
import { RedirectPage } from './pages/RedirectPage'
import { AppContext, AppContextProps } from './services/AppContext'

import './api/axiosInstance'

interface Props {
  appContext: AppContextProps
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigation />,
    children: [
      {
        path: 'dashboard/',
        element: <DashboardPage />,
      },
      {
        path: 'address/:address',
        element: <AddressPage />,
      },
      {
        path: '*',
        element: <RedirectPage />,
      },
    ],
  },
])

const App: FC<Props> = observer((props) => {
  return (
    <AppContext.Provider value={props.appContext}>
      <ToastContainer
        draggable
        rtl={false}
        pauseOnHover
        hideProgressBar
        autoClose={5000}
        pauseOnFocusLoss
        closeButton={false}
        newestOnTop={false}
        position="bottom-right"
      />
      <RouterProvider router={router} />
    </AppContext.Provider>
  )
})

export default App
