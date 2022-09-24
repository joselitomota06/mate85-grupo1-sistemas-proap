import axios from 'axios'
import { LocalStorageToken } from '../helpers/auth'

const api = axios.create({
  baseURL: 'https://proap-api.herokuapp.com/proap-api',
})

api.interceptors.request.use(
  (config) => {
    const token = LocalStorageToken.get()
    if (token)
      return {
        ...config,
        headers: {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        },
      }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default api
