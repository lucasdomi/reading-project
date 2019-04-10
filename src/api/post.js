import { apiUrl, headers } from '../helpers/config';
import axios from 'axios';

export const getPosts = () => 
  axios.get ( `${apiUrl}/posts`, { headers } )
    .then( res => res.data)

export const getPostsByCategory = category => (
  axios.get ( `${apiUrl}/${category}/posts`, {headers} )
    .then( res => res.data )
)

export const getPost = postId => (
  axios.get ( `${apiUrl}/posts/${postId}`, {headers} )
    .then( res => res.data )
)

// export const addPost = post => (
//   axios.post ( `${ apiUrl }/posts`, {
//     headers: { ...headers, 'Content-Type': 'application/json' },
//     body: JSON.stringify(post),
//   })
//   .then(res => res.data)
// )

export const addPost = post => (
  fetch ( `${apiUrl}/posts`, {
    method: 'POST',
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify(post),
  })
  .then( res => res.json() )
)

export const updatePost = post => (
  fetch ( `${ apiUrl }/posts/${ post.id }`, {
    method: 'PUT',
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify( post ),
  })
  .then( res => res.json() )
)

export const deletePost = postId => (
  fetch ( `${ apiUrl }/posts/${ postId }`, {
    method: 'DELETE',
    headers,
  })
  .then( res => res.json() )
)