import { apiUrl, headers } from '../helpers/config';
import axios from 'axios';

export const getPosts = () => 
  axios.get ( `${apiUrl}/posts`, { headers } )
    .then( res => res.data)