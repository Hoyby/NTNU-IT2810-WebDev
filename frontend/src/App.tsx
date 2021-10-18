
/* eslint-disable */
import React, {useReducer, createContext} from 'react'
import Dashboard from './components/Dashboard'
import Landing from "./components/Landing";
import { Route } from "react-router-dom";
import Login from "./components/Login";
import "@material-tailwind/react/tailwind.css";

export const AuthContext: any = createContext('auth')

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
}


const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('accessToken', JSON.stringify(action.payload.accessToken))
      // localStorage.setItem('user', jwt(action.payload.accessToken))
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
      }
    case 'LOGOUT':
      localStorage.clear()
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      }
    default:
      return state
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <AuthContext.Provider value={{state, dispatch}}>

        <div className="App">
          <Route path='/' exact={true}>
            {!state.isAuthenticated ? <Landing /> : <Dashboard />}
          </Route>
          <Route path='/login'>
            {!state.isAuthenticated ? <Login/> : <Dashboard />}
          </Route>
        </div>

    </AuthContext.Provider>
  )
}