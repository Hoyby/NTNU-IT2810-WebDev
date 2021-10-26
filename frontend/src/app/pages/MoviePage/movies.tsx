import React from 'react'
import { createSelector } from 'reselect'
import { useAppSelector } from '../../hooks'
import { makeSelectMoviePage } from './selectors'

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
                    <div className="w-64 mb-10 flex flex-col items-center">
                        <div className="mt-4 text-center">{movie?.title}</div>
                        <h5>Description: {movie?.description}</h5>
                    </div>
                ))}
        </div>
    )
}
