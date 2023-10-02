/* eslint-disable prettier/prettier */
import axios from 'axios'
export const getAllImagesProductsService = async (id) => {
  return await axios.get(`/products/${id}/images`)
}


export const createImagesProductsService = async (productoId, data,token) => {
    return await axios.post(`/products/${productoId}/images`, data,{
      headers: { 'access-token': token }
    })
  }
