import { useNavigate } from 'react-router-dom'

import { IconSearch, IconStar, IconTrash } from '../../../../assets/icons'
import { BaseButton } from '../../../../components/common/BaseButton'
import { BaseInput } from '../../../../components/common/BaseInput'
import { BaseLoading } from '../../../../components/common/BaseLoading'
import { Pagination } from '../../../../components/common/Pagination'
import { truncateString } from '../../../../utils/truncateString'

interface Props {
  data: {
    addresses: {
      id: string
      name?: string
      address: string
      isFavorite: boolean
    }[]
    total: number
  }
  page: number
  searchByName: string
  isLoading: boolean
  setPage(skip: number): void
  handleCreateAddress: () => void
  handleDelete({
    e,
    id,
  }: {
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    id: string
  }): void
  handleFavorite({
    e,
    id,
  }: {
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    id: string
  }): void
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const DashboardTable: React.FC<Props> = ({
  data,
  page,
  setPage,
  isLoading,
  handleDelete,
  searchByName,
  handleSearch,
  handleFavorite,
  handleCreateAddress,
}) => {
  const navigate = useNavigate()

  const goToAddress = (id: string) => {
    navigate(`/address/${id}`)
  }

  if (isLoading) return <BaseLoading />

  return (
    <>
      <div className="flex justify-between sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Addresses
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all wallet addresses.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <BaseButton
            size="small"
            type="button"
            style="primary"
            text="Add Address"
            onClick={handleCreateAddress}
          />
        </div>
      </div>
      <div className="mt-5">
        <BaseInput
          type="text"
          value={searchByName}
          placeholder="Search"
          label="Search by name"
          iconLeft={<IconSearch />}
          handleChange={handleSearch}
        />
      </div>
      {data?.total === 0 && (
        <div className="h-[550px] w-full flex flex-col gap-5 justify-center items-center">
          <h1 className="text-3xl font-semibold">Addresses not Found</h1>
          <h1>
            You don&apos;t have any address yet. Click the button below to
            create your first address.
          </h1>
          <BaseButton
            size="small"
            type="button"
            text="Create Address"
            onClick={handleCreateAddress}
          />
        </div>
      )}
      {data?.total !== 0 && (
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-2"
                    >
                      name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      address
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    />
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {data?.addresses &&
                    data?.addresses.map(
                      (address: {
                        id: string
                        name?: string
                        address: string
                        isFavorite: boolean
                      }) => (
                        <tr
                          key={address.id}
                          onClick={() => goToAddress(address.id)}
                          className="hover:bg-primary-200 cursor-pointer"
                        >
                          <td className="capitalize whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                            <p className="truncate w-[200px]">
                              {address?.name
                                ? truncateString(address?.name)
                                : truncateString(address.address)}
                            </p>
                          </td>
                          <td className="capitalize whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                            <p className="truncate w-[200px] md:w-full">
                              {address.address}
                            </p>
                          </td>
                          <td className="whitespace-nowrap px-3 ">
                            <div className="flex items-center justify-center">
                              <div className="flex gap-2 justify-end">
                                <BaseButton
                                  style="tertiary"
                                  className={
                                    address.isFavorite ? 'bg-yellow-300' : ''
                                  }
                                  icon={<IconStar />}
                                  onClick={(e) => handleFavorite(e, address.id)}
                                />
                              </div>
                              <div className="flex gap-2 justify-end">
                                <BaseButton
                                  style="tertiary"
                                  icon={<IconTrash />}
                                  onClick={(e) => handleDelete(e, address.id)}
                                />
                              </div>
                            </div>
                          </td>
                        </tr>
                      ),
                    )}
                </tbody>
              </table>
            </div>
          </div>
          <Pagination
            take={10}
            page={page}
            setPage={setPage}
            total={data?.total || 0}
          />
        </div>
      )}
    </>
  )
}
