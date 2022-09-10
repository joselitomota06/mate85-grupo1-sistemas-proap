import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'authentication',
  initialState: {
    isAuthenticated: false,
  },
  reducers: {
    authenticate: (state) => {
      state.isAuthenticated = true
    },
    logout: (state) => {
      state.isAuthenticated = false
    },
  },
})

export const { authenticate, logout } = authSlice.actions
export default authSlice
