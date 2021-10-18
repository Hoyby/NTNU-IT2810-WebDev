import React, { VFC } from 'react';
import { login } from '../slices/auth';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { isUserAuthenticatedSelector } from '../selectors/auth';
import { useSelector } from '../store';


export const Login: VFC = () => {
  const authenticated = useSelector(isUserAuthenticatedSelector);
  const dispatch = useDispatch();
  const appLogin = () => {
    const userData = {
      displayName: null,
      email: null,
    };
    dispatch(login(userData));
  };
  if (authenticated) {
    return <Redirect to='/landingpage' />;
  }
  return (
    <div>
      <div>
        <button onClick={appLogin} />
      </div>
    </div>
  );
};