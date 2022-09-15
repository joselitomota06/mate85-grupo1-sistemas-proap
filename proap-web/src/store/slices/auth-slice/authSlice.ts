import { createSlice, PayloadAction } from '@reduxjs/toolkit'

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
    },
    logout: (state) => {
      state.isAuthenticated = false
    },
  },
})

export const { authenticate, logout } = authSlice.actions
export default authSlice
