/* eslint-disable prettier/prettier */
import axios from 'axios'
export const getAllProductsService = async (token) => {
  const result = await axios.get('/products',{
    headers: { 'access-token': token },
  })
  return result.data.products
}
export const putUpdateProductsService = async (data, token) => {
  const result = await axios.put(`/products/`, data, {
    headers: { 'access-token': token },
  })
  return result
}

export const createSizeProductsService = async (productoId, data, token) => {
  return await axios.post(`/products/${productoId}/size`, data, {
    headers: { 'access-token': token },
  })
}

export const UpdateSizeProductsService = async (data, token) => {
  return await axios.put(`/sizes/${data.id}/`, data, {
    headers: { 'access-token': token },
  })
}

export const DeleteSizeProductsService = async (id, idProduct, token) => {
  return await axios.delete(`/sizes/${id}/${idProduct}`, {
    headers: { 'access-token': token },
  })
}

export const getAllSizeProductsService = async (id,token) => {
  return await axios.get(`/products/${id}/size`,{
    headers: { 'access-token': token },
  })
}
