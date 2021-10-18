import React, { useEffect, VFC } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import Dashboard from './components/Dashboard'
import { Login } from "./components/Login";
import LandingPage from "./components/LandingPage";
import ErrorsPage from './components/ErrorsPage';
import { useDispatch } from 'react-redux';
import { useSelector } from './store';
import { isUserAuthenticatedSelector } from './selectors/auth';
import { login, logout } from './slices/auth';
import LoadingPage from './components/LoadingPage';
import AuthService from "./services/auth.service";


export const Routes: VFC = () => {
  const authenticated = useSelector(isUserAuthenticatedSelector);
  const dispatch = useDispatch();

  const refresh = React.useCallback(
    async (displayName, email) => {
      const userData = {
        displayName,
        email,
      };
      return dispatch(login(userData));
    },
    [dispatch]
  );

  useEffect(() => {
    const f = async () => {
        AuthService.onAuthStateChanged(async (user:any) => {
        if (user && !authenticated) {
          return await refresh(user.displayName, user.email);
        }
        if (!user && !authenticated) {
          dispatch(logout());
        }
      });
      await AuthService.setPersistence(authProvider.auth.Auth.Persistence.SESSION);
    };
    f();
  });

  if (authenticated === undefined) {
    // "unconfirmed" authentication status
    return <LoadingPage />;
  } else {
    // login user Router
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={Login} />
          <Route path='/landingpage' component={LandingPage} />
          <Route component={ErrorsPage} />
        </Switch>
      </Router>
    );
  }
};