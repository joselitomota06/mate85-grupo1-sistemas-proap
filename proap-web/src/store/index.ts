import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { authSlice } from './slices'

const rootReducer = combineReducers({
  auth: authSlice.reducer,
})

const store = configureStore({
  reducer: rootReducer,
})

export type IRootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch

export default store
