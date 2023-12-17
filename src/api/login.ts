import axios from './axiosInstance'
import { API_URL } from './config'

export const login = async (data: { email: string }) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, data)
    return response.data
  } catch (error) {
    return error
  }
}
