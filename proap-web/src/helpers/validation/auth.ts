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
