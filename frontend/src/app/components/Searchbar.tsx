import React, {useEffect, useState} from 'react'
import MovieService from '../services/movieService'
import { SearchMovies } from '../services/movieService/__generated__/SearchMovies'
import {MovieCard} from "./MovieCard";
import {Redirect, Route, useHistory} from "react-router-dom";
// import {SearchMoviesPageVariables} from "../services/movieService/__generated__/SearchMoviesPage";

export function Searchbar() {
    let timer: NodeJS.Timeout

    const [searchResult, setSearchResult] =
        useState<SearchMovies['searchMovies']>()


    const LINKS_PER_PAGE = 6;
    const history = useHistory();

    const pageIndexParams = history.location.pathname.split(
        '/'
    );
    const page = parseInt(
        pageIndexParams[pageIndexParams.length - 1]
    );

    // const pageIndex = page ? (page - 1) * LINKS_PER_PAGE : 0;

    const getQueryVariables = (page: number) => {
        const skip = (page - 1) * LINKS_PER_PAGE;
        const take = LINKS_PER_PAGE;
        const orderField = 'published';
        const orderValue = 'asc';
        return { take, skip, orderField, orderValue };
    };

    const fetchSearchResults = async (query: string) => {
        const query_variables = getQueryVariables(page)
        const final_query = {
            searchQuery: query,
            take: query_variables.take,
            skip: query_variables.skip,
            orderField: query_variables.orderField,
            orderValue: query_variables.orderValue
        }
        const queryResult = await MovieService.searchMoviesPage(final_query).catch(
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

            <Route
                exact
                path="/"
                render={() => <Redirect to="/page/1" />}
            />

        </>
    )
}

export default Searchbar
