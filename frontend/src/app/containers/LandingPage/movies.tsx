/* eslint-disable */
import React from 'react'
import { createSelector } from 'reselect'
import { useAppSelector } from '../../hooks'
import { makeSelectMoviePage } from './selectors'

const stateSelector = createSelector(makeSelectMoviePage, (moviePage) => ({
  moviePage
}))

export function Movies() {

  const { moviePage } = useAppSelector(stateSelector)

  const isEmptyMoviePage =
    !moviePage || !moviePage.media || moviePage.media.length === 0

  if (!isEmptyMoviePage) return null
  return (
    <div>
      {moviePage &&
        moviePage.media &&
        moviePage.media.map((movie:any) => (
          <div>
            <div>
              <img src={movie?.coverImage?.medium || ""} />
            </div>
            <div>
                {movie?.title?.english}
            </div>
          </div>
        ))}
    </div>
  )
}
