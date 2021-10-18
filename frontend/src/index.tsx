import React from 'react'
import { render } from 'react-dom'
import './styles/global.css'
import App from './App'
import "@material-tailwind/react/tailwind.css";
import { Provider } from 'react-redux';
import { store } from './app/store';
import { apolloClient } from './app/graphql';
import { ApolloProvider } from '@apollo/client';

render(
  <Provider store={store}>
      <ApolloProvider client={apolloClient}>
        <App />
      </ApolloProvider>
  </Provider>,
  document.getElementById('root') as HTMLElement
)
