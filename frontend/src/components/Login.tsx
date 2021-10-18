/* eslint-disable */

import React, { useState } from 'react'
import { AuthContext } from '../App'

// @ts-ignore
import Button from "@material-tailwind/react/Button";
// @ts-ignore
import Input from "@material-tailwind/react/Input";

export default function Login() {
  const { dispatch } = React.useContext(AuthContext)

  const [userInfo, setUserInfo] = useState({
    email: 'Alex',
    password: 'test',
    isSubmitting: false,
    errorMessage: null,
  })

  type TUserData = {
    payload: {
      id: string
      username: string
    }
  }

  const [userData, setUserData] = useState({
    id: '',
    username: '',
  })

  const changeHandler = (e: { target: { name: any; value: any } }) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value })
  }

  const handleLogIn = (event: any) => {
    event.preventDefault()
    setUserInfo({
      ...userInfo,
      isSubmitting: true,
      errorMessage: null,
    })
  }

  //     axios
  //       .post('http://localhost:8000/auth/login', userInfo, {
  //         withCredentials: true,
  //       })
  //       .then((res) => {
  //         dispatch({ type: 'LOGIN', payload: res.data })

  //         // setUserData({
  //         //   ...userData,
  //         //   id: user.payload.id,
  //         //   username: user.payload.username,
  //         // })
  //       })
  //       .catch((error) => {
  //         console.log(error.message || error.statusText)

  //         setUserInfo({
  //           ...userInfo,
  //           isSubmitting: false,
  //           errorMessage: error.response.data.error,
  //         })
  //       })
  //   }

  const handleRefresh = (event: any) => {
    event.preventDefault()
  }

  //     axios
  //       .get('http://localhost:8000/auth/refresh_token/', {
  //         withCredentials: true,
  //       })
  //       .then((res) => {
  //         const accessToken = res.data.accessToken
  //         // const user = jwt(accessToken) as TUserData
  //         localStorage.setItem('accessToken', res.data.accessToken)

  //         // setUserData({
  //         //   ...userData,
  //         //   id: user.payload.id,
  //         //   username: user.payload.username,
  //         // })
  //       })
  //       .catch((error) => {
  //         console.log(error)
  //       })
  //   }

  const handleLogOut = (event: any) => {
    event.preventDefault()
  }

  //     axios
  //       .delete('http://localhost:8000/auth/refresh_token/', {
  //         withCredentials: true,
  //         headers: {
  //           Authorization: `Basic ${localStorage.getItem('accesssToken')}}`,
  //         },
  //       })
  //       .then((res) => {
  //         localStorage.removeItem('accessToken')
  //         setUserData({ ...userData, id: '', username: '' })
  //       })
  //       .catch((error) => {
  //         console.log(error)
  //       })
  //   }

  return (
    <div className="bg-black bg-opacity-20 w-96 flex flex-col m-auto items-center mt-40">
      <h1 className="mb-4 text-amber-500 text-4xl font-bold">Login</h1>
      <form>
        <div className="flex flex-col items-center">
          {/*<label htmlFor="email">
            <b>Email</b>
          </label>*/}
          {/* <input
            className="border-2 w-60 m-2"
            required
            type="text"
            name="email"
            placeholder="Username"
            value={userInfo.email}
            onChange={changeHandler}
          /> */}
          <div className='my-6'>
          <Input
              className="border-2 w-60"
              type="text"
              name="email"
              color="amber"
              size="lg"
              outline={false}
              placeholder="Username"
              onChange={changeHandler}

          />
          </div>

          {/*<label htmlFor="psw">
            <b>Password</b>
          </label>*/}
          {/*<input
            className="border-2 w-60 m-2"
            type="password"
            name="password"
            tokens-testid="password"
            placeholder="Password"
            value={userInfo.password}
            onChange={changeHandler}
          />*/}
          <div className='my-6'>
          <Input
              className="border-2 w-60 m-2"
              type="password"
              name="password"
              color="amber"
              size="lg"
              outline={false}
              placeholder="Password"
              onChange={changeHandler}

          />
          </div>

          <Button color="amber"
                  buttonType="filled"
                  size="regular"
                  rounded={false}
                  block={false}
                  iconOnly={false}
                  ripple="light"
                  className='my-5 text-black' onClick={handleLogIn}>
            Log in
          </Button>
        </div>
      </form>
      <div className="items-center">
        <Button color="amber"
                buttonType="filled"
                size="regular"
                rounded={false}
                block={false}
                iconOnly={false}
                ripple="light"
                className='my-5 text-black' onClick={handleLogOut}>
          Log out
        </Button>
        <Button color="amber"
                buttonType="filled"
                size="regular"
                rounded={false}
                block={false}
                iconOnly={false}
                ripple="light"
                className='my-5 text-black' onClick={handleRefresh}>
          Refresh
        </Button>
      </div>

      <p className="text-red-500">{userInfo.errorMessage}</p>
      <br />
      <p>id: {userData.id}</p>
      <p>username: {userData.username}</p>
    </div>
  )
}
