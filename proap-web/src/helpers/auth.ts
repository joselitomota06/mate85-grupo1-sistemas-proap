import jwt_decode from 'jwt-decode'

interface DecodedToken {
  email: string
  exp: number
  iat: number
  id: number
  login: string
  name: string
}

export const LOCAL_STORAGE_TOKEN_KEY = 'token'

export const LocalStorageToken = {
  get: () => {
    return localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY) ?? ''
  },

  save: (token: string) => {
    localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token)
  },

  clear: () => {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY)
  },
}

export const getInitialAuthSliceState = () => {
  const token = LocalStorageToken.get()
  return {
    token,
    isAuthenticated: Boolean(token),
  }
}

export const decodeToken = (token: string): DecodedToken => {
  return token
    ? jwt_decode(token)
    : {
        email: '',
        login: '',
        name: '',
        exp: 0,
        iat: 0,
        id: 0,
      }
}
