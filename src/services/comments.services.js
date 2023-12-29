/* eslint-disable prettier/prettier */
import axios from "axios"

export const getAllCommentsService = async (token) => {
  const result = await axios.get('/comments', {
    headers: { 'access-token': token },
  })
  return result
}
