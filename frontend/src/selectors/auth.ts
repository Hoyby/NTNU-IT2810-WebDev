import { createSelector } from 'reselect';
import { RootState } from '../store';
import { AuthState } from '../slices/auth';

export const authSelector: (state: RootState) => AuthState = (
  state: RootState
) => state.auth;

export const displayNameSelector = createSelector(authSelector, auth => {
  return auth.userName;
});

export const emailSelector = createSelector(authSelector, auth => {
  return auth.email;
});

export const isUserAuthenticatedSelector = createSelector(
  authSelector,
  auth => {
    return auth.authenticated;
  }
);

export const errorSelector = createSelector(authSelector, auth => {
  return auth.error;
});