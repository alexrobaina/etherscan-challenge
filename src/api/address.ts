import axios from './axiosInstance'
import { API_URL } from './config'

export const create = async (data: { address: string }) => {
  try {
    const response = await axios.post(`${API_URL}/v1/address`, data)
    return response.data
  } catch (error) {
    return error
  }
}

export const update = async (data: {
  id: string
  name?: string
  address?: string
  isFavorite: boolean
}) => {
  try {
    const response = await axios.put(`${API_URL}/v1/address`, data)
    return response.data
  } catch (error) {
    return error
  }
}

export const getAddresses = async ({
  page,
  search,
  address,
}: {
  page: number
  search?: string
  address: string
}) => {
  try {
    const response = await axios.get(
      `${API_URL}/v1/address?search=${search}&address=${address}&page=${page}`,
    )
    return response.data
  } catch (error) {
    return error
  }
}

export const deleteAddress = async ({ id }: { id: string }) => {
  try {
    const response = await axios.delete(`${API_URL}/v1/address/${id}`)
    return response.data
  } catch (error) {
    return error
  }
}

export const getAddress = async (id: string) => {
  try {
    const response = await axios.get(`${API_URL}/v1/address/${id}`)
    return response.data
  } catch (error) {
    return error
  }
}
