import React from 'react'
import ReactDOM from 'react-dom'
import './styles/global.css'
import App from './App'
import { store } from './app/store'
import { Provider } from 'react-redux'
import { ApolloProvider } from '@apollo/client'
import { apolloClient } from './app/graphql'
import "@material-tailwind/react/tailwind.css";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ApolloProvider client={apolloClient}>
          <link
              href="https://fonts.googleapis.com/icon?family=Material+Icons"
              rel="stylesheet"
          />
          <link
              rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css"
              integrity="sha512-HK5fgLBL+xu6dm/Ii3z4xhlSUyZgTT9tuc/hSrtw6uzJOvgRr2a9jyxxT1ely+B+xFAmJKVSTbpM/CuL7qxO8w=="
              crossOrigin="anonymous"
          />
        <App />
      </ApolloProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
