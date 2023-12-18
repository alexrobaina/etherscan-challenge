import axios from './axiosInstance'
import { API_URL } from './config'

export const create = async (data: {
  amount: string
  address?: string
  currency: string
  exchangeRate: string
}) => {
  try {
    const response = await axios.post(`${API_URL}/v1/etherExchangeRate`, data)
    return response.data
  } catch (error) {
    return error
  }
}

export const getAddress = async (id: string) => {
  try {
    const response = await axios.get(`${API_URL}/v1/etherExchangeRate/${id}`)
    return response.data
  } catch (error) {
    return error
  }
}
