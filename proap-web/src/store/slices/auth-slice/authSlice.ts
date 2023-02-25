import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { LocalStorageToken } from '../../../helpers/auth';

const authSlice = createSlice({
  name: 'authentication',
  initialState: {
    isAuthenticated: false,
    token: '',
  },
  reducers: {
    authenticate: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = true;
      state.token = action.payload;

      LocalStorageToken.save(action.payload);
      axios.defaults.headers.common[
        'x-access-token'
      ] = `Bearer ${action.payload}`;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      LocalStorageToken.clear();
    },
  },
});

export const { authenticate, logout } = authSlice.actions;
export default authSlice;
