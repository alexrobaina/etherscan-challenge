/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useState } from 'react'

import { DeleteModal } from '../../components/common/DeleteModal'
import { useGetAddresses } from '../../hooks/useGetAddresses'

import { CreateAddressModal } from './components/CreateAddressModal'
import { DashboardHeader } from './components/DashboardHeader'
import { DashboardTable } from './components/DashboardTable/DashboardTable'

export const DashboardPage: FC = () => {
  const [filters, setFilters] = useState<any>({
    page: 1,
    search: '',
    address: '',
  })
  const { data } = useGetAddresses(filters)

  const [deleteModalAddress, setDeleteModalAddress] = useState(false)
  const [isOpenModalCreation, setOpenModalCreation] = useState(false)

  const setPage = (page: number) => {
    setFilters({ ...filters, page })
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, search: e.target.value })
  }

  const handleDelete = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string,
  ) => {
    console.log(id)

    e.stopPropagation()
  }

  const handleFavorite = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string,
  ) => {
    console.log(id)

    e.stopPropagation()
  }

  const closeModalAddressCreation = () => {
    setOpenModalCreation(false)
  }

  const handleDeleteAddress = () => {
    setDeleteModalAddress(false)
  }

  // if (false)
  //   <div className="mt-20">
  //     <BaseLoading large />
  //   </div>

  return (
    <>
      <DashboardHeader />
      <div className="px-4 sm:px-6 lg:px-8 shadow-md rounded-lg mt-16">
        <DashboardTable
          data={data}
          setPage={setPage}
          page={filters.page}
          handleSearch={handleSearch}
          handleDelete={handleDelete}
          searchByName={filters.search}
          handleFavorite={handleFavorite}
          handleCreateAddress={setOpenModalCreation}
        />
      </div>
      <CreateAddressModal
        isOpen={isOpenModalCreation}
        closeModal={closeModalAddressCreation}
      />
      <DeleteModal
        isOpen={deleteModalAddress}
        handleClose={() => setDeleteModalAddress(false)}
        handleDelete={handleDeleteAddress}
        title={`Are you sure you want to delete?`}
      />
    </>
  )
}
