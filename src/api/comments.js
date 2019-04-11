import { apiUrl, headers } from '../helpers/config';
import axios from 'axios'

export const getPostComments = postId => (
  axios.get(`${ apiUrl }/posts/${postId}/comments`,{headers})
    .then(res => res.data)
)

export const addComment = ( commentData ) => (
  fetch ( `${ apiUrl }/comments`, {
    method: 'POST',
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify( commentData ),
  } )
  .then( res => res.json() )
)

export const editComment = ( commentData ) => (
  fetch ( `${ apiUrl }/comments/${commentData.id}`, {
    method: 'PUT',
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify( commentData ),
  } )
  .then( res => res.json() )
)