import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// import { authSlice } from '../slices/auth';
import LandingPageSlice from './containers/LandingPage/LandingPageSlice';

export const store = configureStore({
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