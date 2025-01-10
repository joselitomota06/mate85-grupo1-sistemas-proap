import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../../types';

interface UserState {
  currentUser: User;
  isLoading: boolean;
  error: string | null;
}

export const INITIAL_USER_STATE: User = {
  name: '',
  cpf: '',
  email: '',
  phone: '',
  alternativePhone: '',
  registrationNumber: '',
  profileName: '',
};

const initialState: UserState = {
  currentUser: INITIAL_USER_STATE,
  isLoading: false,
  error: null,
};

const userProfileSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.currentUser) {
        state.currentUser = { ...state.currentUser, ...action.payload };
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setUser, updateUser, setLoading, setError } =
  userProfileSlice.actions;
export default userProfileSlice;
export { initialState as USER_PROFILE_INITIAL_STATE };
