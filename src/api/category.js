const axios = require('axios');

const apiUrl = 'http://localhost:3001'

const headers = {
  'Accept': 'application/json',
}

export const getCategories = () =>
 axios.get(`${apiUrl}/categories`, {headers} )
    .then ( res => res.json)