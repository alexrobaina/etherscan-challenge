import { FC } from 'react'
import { Outlet } from 'react-router-dom'

interface Props {}

export const Navbar: FC<Props> = () => {
  return (
    <>
      <nav className="bg-primary-200 fixed top-0 left-0 w-full z-10">
        <div className="md:pl-20 md:pr-20">
          <div className="relative flex h-16 items-center justify-between">
            <div className="flex items-center px-2 lg:px-0"></div>
          </div>
        </div>
      </nav>
      <div className="p-5 md:ml-16 md:mr-16 pt-28">
        <Outlet />
      </div>
    </>
  )
}
