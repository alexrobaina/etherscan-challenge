/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useState } from 'react'

import { DeleteModal } from '../../components/common/DeleteModal'
import { useDeleteAddress } from '../../hooks/useDeleteAddress'
import { useGetAddresses } from '../../hooks/useGetAddresses'
import { useUpdateAddress } from '../../hooks/useUpdateAddress'

import { CreateAddressModal } from './components/CreateAddressModal'
import { DashboardHeader } from './components/DashboardHeader'
import { DashboardTable } from './components/DashboardTable/DashboardTable'
import { EditAddressModal } from './components/EditAddressModal'

export const DashboardPage: FC = () => {
  const { mutate } = useUpdateAddress()
  const { mutate: mutateDelete } = useDeleteAddress()
  const [addressId, setAddressId] = useState<string>('')
  const [filters, setFilters] = useState<any>({
    page: 1,
    search: '',
    address: '',
  })
  const { data, isLoading } = useGetAddresses(filters)
  const [isOpenModalUpdate, setOpenModalUpdate] = useState(false)
  const [deleteModalAddress, setDeleteModalAddress] = useState(false)
  const [isOpenModalCreation, setOpenModalCreation] = useState(false)

  const setPage = (page: number) => {
    setFilters({ ...filters, page })
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, search: e.target.value })
  }

  const handleOpenDeleteModal = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string,
  ) => {
    setAddressId(id)
    setDeleteModalAddress(true)
    e.stopPropagation()
  }

  const handleFavorite = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string,
    isFavorite: boolean,
  ) => {
    mutate({
      id: id,
      isFavorite: !isFavorite,
    })
    e.stopPropagation()
  }

  const closeModalAddressCreation = () => {
    setOpenModalCreation(false)
  }

  const handleDeleteAddress = () => {
    mutateDelete({ id: addressId })
    setDeleteModalAddress(false)
  }

  const handleOpenEditModal = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string,
  ) => {
    setAddressId(id)
    setOpenModalUpdate(true)
    e.stopPropagation()
  }

  const handleCreateAddress = () => {
    setOpenModalCreation(true)
  }

  return (
    <>
      <DashboardHeader />
      <div className="px-4 sm:px-6 lg:px-8 shadow-md rounded-lg mt-16">
        <DashboardTable
          data={data}
          setPage={setPage}
          page={filters.page}
          isLoading={isLoading}
          handleSearch={handleSearch}
          searchByName={filters.search}
          handleFavorite={handleFavorite}
          handleDelete={handleOpenDeleteModal}
          handleOpenEditModal={handleOpenEditModal}
          handleCreateAddress={handleCreateAddress}
        />
      </div>
      <CreateAddressModal
        isOpen={isOpenModalCreation}
        closeModal={closeModalAddressCreation}
      />
      <EditAddressModal
        addressId={addressId}
        isOpen={isOpenModalUpdate}
        setAddressId={setAddressId}
        closeModal={() => setOpenModalUpdate(false)}
      />
      <DeleteModal
        isOpen={deleteModalAddress}
        handleDelete={handleDeleteAddress}
        title={`Are you sure you want to delete?`}
        handleClose={() => setDeleteModalAddress(false)}
      />
    </>
  )
}
