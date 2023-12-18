import axios from './axiosInstance'
import { API_URL } from './config'

export const getEtherExcangeRate = async ({
  amount,
  address,
  currency,
}: {
  amount: string
  currency: string
  address?: string
}) => {
  try {
    const response = await axios.get(
      `${API_URL}/v1/etherExchangeRate?currency=${currency}&address=${address}&amount=${amount}`,
    )
    return response.data
  } catch (error) {
    return error
  }
}

export const getAllExchangeRates = async (addressId: string) => {
  try {
    const response = await axios.get(
      `${API_URL}/v1/etherExchangeRate/${addressId}`,
    )
    return response.data
  } catch (error) {
    return error
  }
}

export const createEtherExcangeRate = async ({
  amount,
  address,
  currency,
}: {
  amount: string
  address: string
  currency: string
}) => {
  try {
    const response = await axios.post(`${API_URL}/v1/etherExchangeRate`, {
      amount,
      address,
      currency,
    })
    return response.data
  } catch (error) {
    return error
  }
}
