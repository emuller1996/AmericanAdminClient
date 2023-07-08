/* eslint-disable prettier/prettier */
import axios from 'axios'
export const getAllProductsService = async () => {
  const result = await axios.get('/products')
  return result.data.products
}
