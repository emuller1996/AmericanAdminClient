/* eslint-disable prettier/prettier */
import axios from 'axios'

export const getAllCommentsService = async (token) => {
  const result = await axios.get('/comments', {
    headers: { 'access-token': token },
  })
  return result
}
export const postCreateSubCommentsService = async (token, data) => {
  const result = await axios.post(`/comments/${data.CommentId}/subcomment`, data, {
    headers: { 'access-token': token },
  })
  return result
}
