/* eslint-disable */
import React, { useEffect } from 'react'
import { Dispatch } from 'redux'
import Button from '../../components/Button'
import { useAppDispatch } from '../../hooks'
import movieService from '../../services/movieService'
import { GetMoviePage } from '../../services/movieService/__generated__/GetMoviePage'
import { setMoviePage } from './LandingPageSlice'
import { Movies } from './movies'

const actionDispatch = (dispatch: Dispatch) => ({
  setMoviePage: (page: GetMoviePage['Page']) => dispatch(setMoviePage(page)),
})

function LandingPage() {
  const { setMoviePage } = actionDispatch(useAppDispatch())

  const fetchMoviePage = async () => {
    const moviePage = await movieService.getMoviePage(0).catch((err) => {
      console.warn('Error', err)
    })

    console.warn('Movie page: ', moviePage)
    if (moviePage) setMoviePage(moviePage)
  }

  useEffect(() => {
    fetchMoviePage()
  }, [])

  const onClickRegister = () => {
    console.warn('register')
  }
  const onClickLogin = () => {
    console.warn('login')
  }

  return (
    <div className={'flex-initial py-36'}>
      <h1 className={'text-red-600 text-7xl font-bold'}>Register now</h1>
      <h3 className={'text-4xl'}>and gain instant access to</h3>
      <h1 className={'text-yellow-50 text-8xl font-bold'}>1000000+</h1>
      <h2 className={'text-yellow-50 text-6xl'}>movie reviews</h2>
      <Button
        to="/register"
        onClick={onClickRegister}
        styling={
          'p-3 hover:bg-yellow-300 bg-yellow-400 rounded-lg text-lg text-black font-bold'
        }
        text={'register'}
      />
      <Button
        to="/login"
        onClick={onClickLogin}
        styling={
          'm-10 p-2 border-4 border-yellow-400 hover:border-yellow-300 text-lg rounded-lg text-yellow-400 hover:text-yellow-300 font-bold'
        }
        text={'login'}
      />

      <Movies/>
    </div>
  )
}

export default LandingPage
