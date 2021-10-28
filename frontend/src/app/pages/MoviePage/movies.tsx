import React from 'react'
import { createSelector } from 'reselect'
import { useAppSelector } from '../../hooks'
import { makeSelectMoviePage } from './selectors'
import {MovieCard} from "../../components/MovieCard";

const stateSelector = createSelector(makeSelectMoviePage, (moviePage) => ({
    moviePage: moviePage,
}))

export function Movies() {
    const { moviePage: movies } = useAppSelector(stateSelector)

    const isEmptyMoviePage = !movies || movies.length === 0

    if (isEmptyMoviePage) return <div>Loading...</div>

    return (
        <div className="max-w-screen-xl w-full h-full flex justify-evenly flex-wrap">

            {movies &&
                movies.map((movie) => (
                    <div className='p-10'>
                        <MovieCard title={movie.title} _id={movie._id}/>
                    </div>
                ))}

        </div>
    )
}
