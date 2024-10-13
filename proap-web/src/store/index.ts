import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import { getInitialAuthSliceState } from '../helpers/auth';
import { authSlice, assistanceRequestSlice } from './slices';

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  assistanceRequestSlice: assistanceRequestSlice.reducer,
});

const preloadedState: Partial<IRootState> = {
  auth: getInitialAuthSliceState(),
}

const store = configureStore({
  reducer: rootReducer,
  preloadedState
});

export type IRootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
