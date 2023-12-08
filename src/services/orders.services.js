/* eslint-disable prettier/prettier */
import axios from 'axios'

export const getAllOrdersService = async (token) => {
  const result = await axios.get('/orders', {
    headers: { 'access-token': token },
  })
  return result.data.products
}
