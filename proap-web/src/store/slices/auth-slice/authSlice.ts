import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { LocalStorageToken } from '../../../helpers/auth';

const INITIAL_STATE = {
  isAuthenticated: false,
  token: '',
};
const authSlice = createSlice({
  name: 'authentication',
  initialState: INITIAL_STATE,
  reducers: {
    authenticate: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = true;
      state.token = action.payload;

      LocalStorageToken.save(action.payload);
      axios.defaults.headers.common['Authorization'] =
        `Bearer ${action.payload}`;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      LocalStorageToken.clear();
    },
  },
});

export const { authenticate, logout } = authSlice.actions;
export default authSlice;
export { INITIAL_STATE as AUTH_INITIAL_STATE };
