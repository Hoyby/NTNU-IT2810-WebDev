import React, { useEffect } from 'react'
import { Dispatch } from 'redux'
import { useAppDispatch } from '../../hooks'
import movieService from '../../services/movieService'
import { GetMovies } from '../../services/movieService/__generated__/GetMovies'
import { setMoviePage } from './moviePageSlice'
import { Movies } from './movies'

// Redux dispatch
const actionDispatch = (dispatch: Dispatch) => ({
    setMoviePage: (page: GetMovies['getmovies']) =>
        dispatch(setMoviePage(page)),
})

export function MoviePage() {
    // eslint-disable-next-line
    const findMovieByID = async (id: string) => {
        const movie = await movieService.findMovie(id).catch((err: Error) => {
            console.error(err)
            throw err
        })

        console.warn(movie)
    }

    // -------------TEST------------------
    // Returns error 400
    //
    // console.warn(
    //     findMovieByID('6176af41aa18f347ce6d4f8f').catch((err) => {
    //         console.error(err)
    //         throw err
    //     }),
    // )
    // -------------TEST------------------

    const { setMoviePage: setMovies } = actionDispatch(useAppDispatch())

    const fetchMoviePage = async () => {
        const moviePage = await movieService.getMovies().catch((err: Error) => {
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
