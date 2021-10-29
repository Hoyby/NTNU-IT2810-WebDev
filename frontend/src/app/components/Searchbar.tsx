import React, { useState } from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import MovieService from '../services/movieService'
import { SearchMovies } from '../services/movieService/__generated__/SearchMovies'
import MovieDetail from './MovieDetail'

export function Searchbar() {
    let timer: NodeJS.Timeout

    const [searcResult, setSearcResult] =
        useState<SearchMovies['searchMovies']>()

    const fetchSearchResults = async (query: string) => {
        const queryResult = await MovieService.searchMovie(query).catch(
            (err: Error) => {
                console.error(err)
            },
        )
        if (queryResult) setSearcResult(queryResult)
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        clearTimeout(timer)
        timer = setTimeout(() => {
            fetchSearchResults(event.target.value).catch((err) => {
                console.error(err)
                throw err
            })
        }, 500)
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="searchbar">Search</label>
                <input
                    type="text"
                    className="block text-black border border-grey-light w-full p-3 rounded mb-4"
                    name="searchbar"
                    id="searchbar"
                    placeholder="Search Movies"
                    onChange={handleInputChange}
                />
            </form>

            <div className="max-w-screen-xl w-full h-full flex justify-evenly flex-wrap">
                {searcResult &&
                    searcResult.map((movie) => (
                        <Link to={'/movies/' + movie._id} key={movie._id}>
                            <div className="w-64 mb-10 flex flex-col items-center">
                                <div className="mt-4 text-center">
                                    {movie?.title}
                                </div>
                            </div>
                        </Link>
                    ))}
                <Switch>
                    <Route path="/movies/:id" children={<MovieDetail />} />
                </Switch>
            </div>
        </>
    )
}

export default Searchbar
