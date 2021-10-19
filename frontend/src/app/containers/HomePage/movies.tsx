import React from 'react'
import { createSelector } from 'reselect'
import { useAppSelector } from '../../hooks'
import { makeSelectMoviePage } from './selectors'

const stateSelector = createSelector(makeSelectMoviePage, (moviePage) => ({
  moviePage: moviePage,
}))

export function Movies() {
  const { moviePage: moviePage } = useAppSelector(stateSelector)

  const isEmptyMoviePage =
    !moviePage || !moviePage.media || moviePage.media.length === 0

  if (isEmptyMoviePage) return <div>Loading...</div>

  return (
    <div className="max-w-screen-xl w-full h-full flex justify-evenly flex-wrap">
      {moviePage &&
        moviePage.media &&
        moviePage.media.map((movie) => (
          <div className="w-64 mb-10 flex flex-col items-center">
            <div className="w-auto h-60">
              <img
                className="w-auto h-full"
                src={movie?.coverImage?.extraLarge || ''}
              />
            </div>
            <div className="mt-4 text-center">{movie?.title?.english}</div>
            <h5>Avergae Score: {movie?.averageScore}</h5>
          </div>
        ))}
    </div>
  )
}
