import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://proap-api.herokuapp.com/proap-api',
})
