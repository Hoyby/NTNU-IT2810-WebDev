import React from 'react'
import { render } from 'react-dom'
import './styles/global.css'
import App from './App'
import { Layout } from './components/Layout'
import "@material-tailwind/react/tailwind.css";
import { Provider } from 'react-redux';
import { store } from './store';

render(
  <Provider store={store}>
    <Layout>
      <App />
    </Layout>,
  </Provider>,
  document.getElementById('root') as HTMLElement
)
