import React from 'react'
import { createSelector } from 'reselect'
import { useAppSelector } from '../../hooks'
import { makeSelectMoviePage } from './selectors'
import { MovieCard } from '../../components/MovieCard'
import { Link, Route, Switch } from 'react-router-dom'
import MovieDetail from '../../components/MovieDetail'

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
                    <Link to={'/movies/' + movie._id} key={movie._id}>
                        <div className="w-64 mb-10 flex flex-col items-center">
                            <div className="mt-4 text-center">
                                <MovieCard
                                    title={movie?.title}
                                    description={movie?.description}
                                    _id={movie?._id}
                                />
                            </div>
                        </div>
                    </Link>
                ))}
            <Switch>
                <Route path="/movies/:id" children={<MovieDetail />} />
            </Switch>
        </div>
    )
}
