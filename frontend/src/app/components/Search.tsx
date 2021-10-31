import React, { useEffect, useState } from 'react'
import MovieService from '../services/movieService'
import { SearchMovies } from '../services/movieService/__generated__/SearchMovies'
import { MovieCard } from './MovieCard'
// material-tailwind is not officially supported by TS - hence the ignores
/* eslint-disable */
// @ts-ignore
import InputIcon from '@material-tailwind/react/InputIcon'
// @ts-ignore
import Icon from '@material-tailwind/react/Icon'
// @ts-ignore
import Button from '@material-tailwind/react/Button'
import {useHistory} from "react-router-dom";
/* eslint-enable */

export function Search() {
    let timer: NodeJS.Timeout

    const [sortValue, setSortValue] = useState(-1)

    const [searchResult, setSearchResult] =
        useState<SearchMovies['searchMovies']>()

    const [searchInput] = useState<string>('')

    const LINKS_PER_PAGE = 6;
    const history = useHistory();

    const pageIndexParams = history.location.pathname.split(
        '/'
    );
    const page = parseInt(
        pageIndexParams[pageIndexParams.length - 1]
    );

    const getQueryVariables = (page: number) => {
        page = 1
        const skip = (page - 1) * LINKS_PER_PAGE;
        const take = LINKS_PER_PAGE;
        const orderField = 'published';
        const orderValue = sortValue;
        const filterField = 'published';
        const filterCond = '$gte';
        const filterValue = 1800;
        return { take, skip, orderField, orderValue, filterField, filterCond, filterValue };
    };

    const fetchSearchResults = async (query: string) => {
        const query_variables = getQueryVariables(page)
        const final_query = {
            searchQuery: query,
            take: query_variables.take,
            skip: query_variables.skip,
            orderField: query_variables.orderField,
            orderValue: query_variables.orderValue,
            filterField: query_variables.filterField,
            filterCond: query_variables.filterCond,
            filterValue: query_variables.filterValue
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
        }, 700)
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
    }

    useEffect(() => {
        fetchSearchResults(searchInput).catch((err) => {
            console.error(err)
            throw err
        })
    }, [sortValue])

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
            <form className="my-10" onSubmit={handleSubmit}>
                <InputIcon
                    type="text"
                    name="searchbar"
                    id="searchbar"
                    className="p-3 mb-16"
                    color="blueGray"
                    size="lg"
                    iconFamily="material-icons"
                    iconName="search"
                    outline={true}
                    placeholder="Search Movies"
                    onChange={handleInputChange}
                />
            </form>
            <Button
                size="sm"
                className="ml-auto my-5"
                ripple="light"
                color="pink"
                onClick={() => {
                    setSortValue(-sortValue)
                }}
            >
                <Icon name="sort" size="sm" /> Sort by date added
            </Button>

            <div className="max-w-screen-xl w-full h-full flex justify-between flex-wrap gap-8 mb-10">
                {searchResult &&
                    searchResult.map((movie) => (
                        <MovieCard
                            title={movie?.title}
                            description={movie?.description}
                            _id={movie?._id}
                        />
                    ))}
            </div>
        </>
    )
}

export default Search
