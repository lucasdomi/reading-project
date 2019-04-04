import { apiUrl, headers } from '../helpers/config';
import axios from 'axios'

export const getPostComments = postId => (
  axios.get(`${ apiUrl }/posts/${postId}/comments`,{headers})
    .then(res => res.data)
)