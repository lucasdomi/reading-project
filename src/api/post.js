const axios = require('axios');
const apiUrl = 'http://localhost:3001'

let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(27).substr(-9)

const headers = {
  'Accept': 'application/json',
  'Authorization' : token
}

export const getPosts = () => 
  axios.get ( `${apiUrl}/posts`, { headers } )
    .then( res => res.data)

