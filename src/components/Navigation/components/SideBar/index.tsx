import { FC, ReactElement, MouseEvent } from 'react'
import { useNavigate } from 'react-router-dom'

import { IconHomeInfinity, IconLogout } from '../../../../assets/icons'
import { deleteCookie } from '../../../../utils/deleteCookie'
import { ButtonNavigate } from '../ButtonNavigate'

interface Props {
  children: ReactElement
  menuIsCollapsed: boolean
  setMenuIsCollapsed: (isCollapsed: boolean) => void
}

export const SideBar: FC<Props> = ({
  children,
  menuIsCollapsed,
  setMenuIsCollapsed,
}) => {
  const navigation = useNavigate()

  const handleLogout = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    deleteCookie('email')
    deleteCookie('token')
    navigation('/')
    window.location.reload()
  }

  const handleMenuIsCollapsed = () => {
    setMenuIsCollapsed(!menuIsCollapsed)
  }

  const TOP_NAVIGATION = [
    { to: '/dashboard', icon: <IconHomeInfinity />, text: 'Dashboard' },
  ]

  return (
    <div className="flex relative overflow-hidden">
      {/* Fixed Sidebar */}
      <div className="fixed h-auto bottom-0 top-0 mt-2 mb-2 ml-2 flex flex-col bg-primary-300 rounded-md">
        <div
          onClick={handleMenuIsCollapsed}
          className={`${
            menuIsCollapsed ? 'min-w-[67px]' : 'min-w-[218px]'
          }  bg-primary-300 h-full cursor-pointer
           rounded-md flex flex-col justify-between items-center p-2`}
        >
          <div className="w-full flex flex-col gap-2">
            {TOP_NAVIGATION.map((item, index) => (
              <ButtonNavigate
                key={index}
                icon={item.icon}
                text={item.text}
                menuIsCollapsed={menuIsCollapsed}
                handleNavigation={(e: MouseEvent<HTMLButtonElement>) => {
                  e.stopPropagation()
                  navigation(item.to)
                }}
              />
            ))}
          </div>
          <div className="w-full flex flex-col gap-2">
            <button
              onClick={handleLogout}
              className={`${
                menuIsCollapsed ? 'justify-center' : 'justify-start'
              } flex justify-start gap-4 p-2 w-full h-[48px] bg-primary-200 rounded-md items-center hover:bg-primary-100`}
            >
              <IconLogout />
              {!menuIsCollapsed && <p>Logout</p>}
            </button>
          </div>
        </div>
      </div>
      {/* Main Content Area */}
      <div
        className={`flex-1 ${
          menuIsCollapsed ? 'ml-[67px]' : 'ml-[218px]'
        } p-2 overflow-y-auto`}
      >
        {children}
      </div>
    </div>
  )
}
