/* eslint-disable */
import React from 'react'
import { Layout } from './app/components/Layout'
import '@material-tailwind/react/tailwind.css'
import LandingPage from './app/containers/LandingPage'

export default function App() {
  return (
    <Layout>
      <LandingPage />
    </Layout>
  )
}
