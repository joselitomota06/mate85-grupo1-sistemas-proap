import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { getInitialAuthSliceState } from '../helpers/auth';
import { authSlice, assistanceRequestSlice, profileSlice } from './slices';

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  assistanceRequestSlice: assistanceRequestSlice.reducer,
  profileSlice: profileSlice.reducer,
});

const loadState = (): Partial<IRootState> | undefined => {
  try {
    const serializedState = localStorage.getItem('reduxState');
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch (err) {
    console.error('Error loading state from local storage: ', err);
    return undefined;
  }
};

const saveState = (state: Partial<IRootState>) => {
  try {
    const previousState = loadState() || {};
    const newState = {
      ...previousState,
      ...state,
    };
    const serializedState = JSON.stringify(newState);
    localStorage.setItem('reduxState', serializedState);
  } catch (err) {
    console.error('Error saving state to local storage: ', err);
  }
};

const preloadedState: Partial<IRootState> = {
  auth: getInitialAuthSliceState(),
  ...(loadState() || {}),
};

const store = configureStore({
  reducer: rootReducer,
  preloadedState,
});

export type IRootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export { saveState };

export default store;
