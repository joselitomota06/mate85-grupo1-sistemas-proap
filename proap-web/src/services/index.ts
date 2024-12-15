import axios from 'axios';
import { BASE_API_URL } from '../helpers/api';
import { LocalStorageToken } from '../helpers/auth';

const api = axios.create({
  baseURL: BASE_API_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = LocalStorageToken.get();
    if (token)
      return {
        ...config,
        headers: {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        },
      } as any;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;
