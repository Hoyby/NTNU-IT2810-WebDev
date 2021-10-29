import React, {useEffect, useState} from 'react'
import MovieService from '../services/movieService'
import { SearchMovies } from '../services/movieService/__generated__/SearchMovies'
import {MovieCard} from "./MovieCard";

export function Searchbar() {
    let timer: NodeJS.Timeout

    const [searchResult, setSearchResult] =
        useState<SearchMovies['searchMovies']>()

    const fetchSearchResults = async (query: string) => {
        const queryResult = await MovieService.searchMovie(query).catch(
            (err: Error) => {
                console.error(err)
            },
        )
        if (queryResult) setSearchResult(queryResult)
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

    useEffect(() => {
        async function search() {
            await fetchSearchResults('')
        }
        search().catch((err: Error) => {
            console.error(err.message)
            throw err
        })
    }, []);


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
                {searchResult &&
                    searchResult.map((movie) => (
                        <div className='p-10'>
                            <MovieCard title={movie.title} _id={movie._id}/>
                        </div>
                    ))}
            </div>
        </>
    )
}

export default Searchbar
