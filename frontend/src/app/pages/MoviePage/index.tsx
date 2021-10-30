import React, { useEffect } from 'react'
import { Dispatch } from 'redux'
import { useAppDispatch } from '../../hooks'
import MovieService from '../../services/movieService'
import { GetMovies } from '../../services/movieService/__generated__/GetMovies'
import { setMoviePage } from './moviePageSlice'
import { Movies } from './movies'

// Redux dispatch
const actionDispatch = (dispatch: Dispatch) => ({
    setMoviePage: (page: GetMovies['getmovies']) =>
        dispatch(setMoviePage(page)),
})

export function MoviePage() {
    const { setMoviePage: setMovies } = actionDispatch(useAppDispatch())

    const fetchMoviePage = async () => {
        const moviePage = await MovieService.getMovies().catch((err: Error) => {
            console.error(err)
            throw err
        })

        if (moviePage) setMovies(moviePage)
    }

    useEffect(() => {
        fetchMoviePage().catch((err) => {
            console.error(err)
            throw err
        })
    }, [])

    return (
        <div className="w-full h-full flex flex-col items-center">
            <h1>Movies</h1>
            <Movies />
        </div>
    )
}
