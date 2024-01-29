/* eslint-disable prettier/prettier */
import axios from 'axios'
export const getAllUsersAdminService = async (token) => {
  return await axios.get(`/users/`, {
    headers: { 'access-token': token },
  })
}
export const postCreateUsersAdminService = async (token, data) => {
  return await axios.post(`/users/`, data, {
    headers: { 'access-token': token },
  })
}
