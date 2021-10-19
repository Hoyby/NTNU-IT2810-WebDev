import React, { useEffect } from 'react'
import { Dispatch } from 'redux'
import { useAppDispatch } from '../../hooks'
import movieService from '../../services/movieService'
import { GetMoviePage } from '../../services/movieService/__generated__/GetMoviePage'
import { setMoviePage } from './homePageSlice'
import { Movies } from './movies'

interface IHomePageProps {}

const actionDispatch = (dispatch: Dispatch) => ({
  setMoviePage: (page: GetMoviePage['Page']) => dispatch(setMoviePage(page)),
})

export function HomePage(props: IHomePageProps) {
  const { setMoviePage: setMoviePage } = actionDispatch(useAppDispatch())

  const fetchMoviePage = async () => {
    const moviePage = await movieService.getMoviePage(0, 200).catch((err) => {
      console.log('Error: ', err)
    })

    console.log('Movie page: ', moviePage)
    if (moviePage) setMoviePage(moviePage)
  }

  useEffect(() => {
    fetchMoviePage()
  }, [])

  return (
    <div className="w-full h-full flex flex-col items-center">
      <h1>Hot Movies</h1>
      <Movies />
    </div>
  )
}
