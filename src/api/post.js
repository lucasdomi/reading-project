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