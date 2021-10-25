import React, { useEffect } from 'react'
import { Dispatch } from 'redux'
import { useAppDispatch } from '../../hooks'
import movieService from '../../services/movieService'
import { GetMoviePage } from '../../services/movieService/__generated__/GetMoviePage'
import { setMoviePage } from './homePageSlice'
import { Movies } from './movies'
import Searchbar from "../../components/Searchbar";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import H1 from "@material-tailwind/react/Heading1";

const actionDispatch = (dispatch: Dispatch) => ({
  setMoviePage: (page: GetMoviePage['Page']) => dispatch(setMoviePage(page)),
})

export function HomePage() {
  const { setMoviePage: setMoviePage } = actionDispatch(useAppDispatch())

  const fetchMoviePage = async () => {
    const moviePage = await movieService.getMoviePage(0, 200).catch((err) => {
      console.error(err)
      throw err
    })

    if (moviePage) setMoviePage(moviePage)
  }

  useEffect(() => {
    fetchMoviePage().catch((err) => {
      console.error(err)
      throw err
    })
  }, [])

  return (
    <div className="w-full h-full flex flex-col items-center">
      <H1 color='amber'>Movies</H1>
      <Searchbar className='py-10' placeholder='search for movies'/>
      <Movies />
    </div>
  )
}
