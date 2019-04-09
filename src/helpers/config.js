export const apiUrl = 'http://localhost:3001'

let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(38).substr(-9)

export const headers = {
  'Accept': 'application/json',
  'Authorization' : token
}