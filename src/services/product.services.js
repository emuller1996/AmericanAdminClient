/* eslint-disable prettier/prettier */
import axios from 'axios'
export const getAllProductsService = async () => {
  const result = await axios.get('/products')
  return result.data.products
}

export const createSizeProductsService = async (productoId, data) => {
  return await axios.post(`/products/${productoId}/size`, data)
}

export const getAllSizeProductsService = async (id) => {
  return await axios.get(`/products/${id}/size`)
}
