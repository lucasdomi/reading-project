import { apiUrl, headers } from '../helpers/config';
import axios from 'axios';

export const getCategories = () =>
  axios.get(`${apiUrl}/categories`, {headers})
    .then(res => res.data)
