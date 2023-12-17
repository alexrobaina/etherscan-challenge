import { observer } from 'mobx-react'
import { FC } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import Navigation from './components/Navigation'
import { DashboardPage } from './pages/DashboardPage'
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
        path: '/dashboard',
        element: <DashboardPage />,
      },
      {
        path: '*',
        element: <DashboardPage />,
      },
    ],
  },
])

const App: FC<Props> = observer((props) => {
  // const [isOpenRoleModal, setOpenRoleModal] = useState<boolean>(false)

  // useEffect(() => {
  //   if (
  //     !props?.appContext?.user?.role &&
  //     props?.appContext?.session?.token !== ''
  //   ) {
  //     setOpenRoleModal(true)
  //   }
  // }, [props?.appContext?.user?.role])

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
      {/* <UserRoleSelectorModal
        isOpenRoleModal={isOpenRoleModal}
        setOpenRoleModal={setOpenRoleModal}
        user={props?.appContext?.user || null}
      /> */}
    </AppContext.Provider>
  )
})

export default App
