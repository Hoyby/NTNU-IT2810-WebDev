import React, { useState } from 'react'
import MovieService from '../services/movieService'
import { SearchMovies } from '../services/movieService/__generated__/SearchMovies'

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
        console.warn(queryResult)
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
                <button type="submit">Search</button>
            </form>
            <div>
                {searcResult &&
                    searcResult.map((movie) => (
                        <div className="w-64 mb-10 flex flex-col items-center">
                            <div className="mt-4 text-center">
                                {movie?.title}
                            </div>
                            <h5>Description: {movie?.description}</h5>
                        </div>
                    ))}
            </div>
        </>
    )
}

export default Searchbar
