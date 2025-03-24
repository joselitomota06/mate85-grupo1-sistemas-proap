import { combineReducers, configureStore, Reducer } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { getInitialAuthSliceState } from '../helpers/auth';
import {
  authSlice,
  assistanceRequestSlice,
  userProfileSlice,
  systemConfigSlice,
} from './slices';
import { SLICES_INITIAL_STATE } from './slices/initialSliceState';

const appReducer = combineReducers({
  auth: authSlice.reducer,
  assistanceRequestSlice: assistanceRequestSlice.reducer,
  userProfileSlice: userProfileSlice.reducer,
  systemConfigSlice: systemConfigSlice.reducer,
});

const rootReducer: Reducer<ReturnType<typeof appReducer>> = (state, action) => {
  if (action.type === 'authentication/logout') {
    return appReducer(SLICES_INITIAL_STATE, action);
  }
  return appReducer(state, action);
};

const loadState = (): Partial<IRootState> | undefined => {
  try {
    const serializedState = localStorage.getItem('localState');
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch (err) {
    console.error('Error loading state from local storage: ', err);
    return undefined;
  }
};

const { auth, ...otherSlices } = SLICES_INITIAL_STATE;

const preloadedState = {
  auth: getInitialAuthSliceState(),
  ...otherSlices,
};

const store = configureStore({
  reducer: rootReducer,
  preloadedState,
});

export type IRootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
