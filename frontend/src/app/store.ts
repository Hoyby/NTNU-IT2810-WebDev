/* eslint-disable */
import { configureStore, ThunkAction, Action, getDefaultMiddleware } from '@reduxjs/toolkit';
// import { authSlice } from '../slices/auth';
import LandingPageSlice from './containers/LandingPage/LandingPageSlice';
import ReduxLogger from 'redux-logger'

const middleware = (getDefaultMiddleware:any) => getDefaultMiddleware().concat(ReduxLogger)

export const store = configureStore({
  middleware,
  reducer: {
    LandingPage: LandingPageSlice
    // auth: authSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;