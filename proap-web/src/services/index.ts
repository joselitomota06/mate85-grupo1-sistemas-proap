import axios from 'axios';
import { BASE_API_URL } from '../helpers/api';
import { LocalStorageToken } from '../helpers/auth';
import { jwtDecode, JwtPayload } from 'jwt-decode';

const api = axios.create({
  baseURL: BASE_API_URL,
});

const isTokenExpired = (token: string): boolean => {
  const decoded = jwtDecode<JwtPayload>(token);
  return decoded.exp ? decoded.exp * 1000 < Date.now() : true;
};

api.interceptors.request.use(
  (config) => {
    const token = LocalStorageToken.get();
    if (token) {
      if (isTokenExpired(token)) {
        LocalStorageToken.clear();
      }
      return {
        ...config,
        headers: {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        },
      } as any;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;
