import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LocalStorageToken } from '../../../helpers/validation/auth'

const authSlice = createSlice({
  name: 'authentication',
  initialState: {
    isAuthenticated: false,
    token: '',
  },
  reducers: {
    authenticate: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = true
      state.token = action.payload

      LocalStorageToken.save(action.payload)
    },
    logout: (state) => {
      state.isAuthenticated = false
      LocalStorageToken.clear()
    },
  },
})

export const { authenticate, logout } = authSlice.actions
export default authSlice
