import React, { useEffect, useState } from 'react'
import MovieService from '../services/movieService'
import { MovieCard } from './MovieCard'
import { useAppDispatch, useAppSelector } from '../hooks'
import { Dispatch } from '@reduxjs/toolkit'
import { setSearchPage } from '../slices/searchPageSlice'
import { SearchMoviesPage_searchMoviesPage } from '../services/movieService/__generated__/SearchMoviesPage'
import { SearchAndSortMovies } from '../services/movieService/__generated__/SearchandSortMovies'

// material-tailwind is not officially supported by TS - hence the ignores
/* eslint-disable */
// @ts-ignore
import InputIcon from '@material-tailwind/react/InputIcon'
// @ts-ignore
import Icon from '@material-tailwind/react/Icon'
// @ts-ignore
import Button from '@material-tailwind/react/Button'
// @ts-ignore
import Input from '@material-tailwind/react/Input'
// @ts-ignore
import Dropdown from '@material-tailwind/react/Dropdown'
// @ts-ignore
import DropdownLink from '@material-tailwind/react/DropdownLink'
/* eslint-enable */

// Redux dispatch
const actionDispatch = (dispatch: Dispatch) => ({
    setSearchResult: (page: SearchAndSortMovies['searchandSortMovie']) =>
        dispatch(setSearchPage(page)),
})

export default function Search() {
    const movieService = new MovieService()

    const LINKS_PER_PAGE = 6
    const INITIAL_PAGE = 1

    const initialFilters: {
        filterField: string
        filterCond: string
        filterValue: number
        sortValue: number
    } = {
        filterField: 'published',
        filterCond: '$lte',
        filterValue: 2000,
        sortValue: -1,
    }

    const [filters, setFilters] = useState(initialFilters)

    const [lastPage, setLastPage] = useState(false)

    // Set new redux seach page state
    const { setSearchResult: setSearchResult } = actionDispatch(
        useAppDispatch(),
    )

    // Current redux seach page state
    const searchResult = useAppSelector((state) => state.searchPage.searchPage)

    const [searchInput, setSearchInput] = useState<string>('')

    const [page, setPage] = useState(INITIAL_PAGE)

    const loadNextPage = () => {
        setPage(page + 1)
    }

    const appendSearchResult = (
        queryResult: SearchMoviesPage_searchMoviesPage[],
    ) => {
        setSearchResult(searchResult?.concat(queryResult))
    }

    const getQueryVariables = (page: number) => {
        const skip = (page - 1) * LINKS_PER_PAGE
        const take = LINKS_PER_PAGE
        const orderField = 'published'
        const orderValue = filters.sortValue
        const filterField = filters.filterField
        const filterCond = filters.filterCond
        const filterValue = filters.filterValue
        return {
            take,
            skip,
            orderField,
            orderValue,
            filterField,
            filterCond,
            filterValue,
        }
    }

    const fetchSearchResults = async () => {
        setPage(INITIAL_PAGE)
        const query_variables = getQueryVariables(page)
        const final_query = {
            searchQuery: searchInput,
            take: query_variables.take,
            skip: query_variables.skip,
            orderField: query_variables.orderField,
            orderValue: query_variables.orderValue,
            filterField: query_variables.filterField,
            filterCond: query_variables.filterCond,
            filterValue: query_variables.filterValue,
        }
        const queryResult = await movieService
            .searchMoviesPage(final_query)
            .catch((err: Error) => {
                console.error(err)
            })
        if (queryResult) setSearchResult(queryResult)
    }

    const fetchAndAppendSearchResults = async () => {
        const query_variables = getQueryVariables(page)
        const final_query = {
            searchQuery: searchInput,
            take: query_variables.take,
            skip: query_variables.skip,
            orderField: query_variables.orderField,
            orderValue: query_variables.orderValue,
            filterField: query_variables.filterField,
            filterCond: query_variables.filterCond,
            filterValue: query_variables.filterValue,
        }
        const queryResult = await movieService
            .searchMoviesPage(final_query)
            .catch((err: Error) => {
                console.error(err)
            })
        if (queryResult) appendSearchResult(queryResult)
        if (queryResult?.length == 0) setLastPage(true)
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
    }

    useEffect(() => {
        setPage(INITIAL_PAGE)
        setLastPage(false)
        fetchSearchResults().catch((err) => {
            console.error(err)
            throw err
        })
    }, [
        filters.sortValue,
        filters.filterField,
        filters.filterCond,
        filters.filterValue,
        searchInput,
    ])

    useEffect(() => {
        if (page != INITIAL_PAGE) {
            fetchAndAppendSearchResults().catch((err) => {
                console.error(err)
                throw err
            })
        }
    }, [page])

    useEffect(() => {
        async function search() {
            await fetchSearchResults()
        }
        search().catch((err: Error) => {
            console.error(err.message)
            throw err
        })
    }, [])

    return (
        <div className="mb-40">
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
                    onChange={(e: { target: { value: string } }) =>
                        setSearchInput(e.target.value)
                    }
                />
            </form>
            {/*onChange={handleInputChange}*/}
            <div className="relative flex items-center justify-between">
                <div className="pr-5">
                    <Dropdown
                        color="red"
                        buttonText={
                            filters.filterField == 'published'
                                ? 'Date Published'
                                : 'Date Added'
                        }
                        buttonType="outline"
                        size="sm"
                        ripple="dark"
                    >
                        <DropdownLink
                            href="#"
                            color="red"
                            ripple="light"
                            onClick={() =>
                                setFilters({
                                    ...filters,
                                    filterField: 'createdAt',
                                })
                            }
                        >
                            Date added
                        </DropdownLink>
                        <DropdownLink
                            href="#"
                            color="red"
                            size="sm"
                            ripple="light"
                            onClick={() =>
                                setFilters({
                                    ...filters,
                                    filterField: 'published',
                                })
                            }
                        >
                            Date Published
                        </DropdownLink>
                    </Dropdown>
                </div>

                <div className="pr-5">
                    <Dropdown
                        color="yellow"
                        buttonText={
                            filters.filterCond == '$lte' ? 'Before' : 'After'
                        }
                        buttonType="outline"
                        size="sm"
                        ripple="dark"
                    >
                        <DropdownLink
                            href="#"
                            color="yellow"
                            ripple="light"
                            onClick={() =>
                                setFilters({
                                    ...filters,
                                    filterCond: '$lte',
                                })
                            }
                        >
                            Before
                        </DropdownLink>
                        <DropdownLink
                            href="#"
                            color="yellow"
                            ripple="light"
                            onClick={() =>
                                setFilters({
                                    ...filters,
                                    filterCond: '$gte',
                                })
                            }
                        >
                            After
                        </DropdownLink>
                    </Dropdown>
                </div>

                <div className="pr-10">
                    <Input
                        type="text"
                        color="yellow"
                        size="sm"
                        outline={true}
                        placeholder={filters.filterValue}
                        onChange={(e: { target: { value: string } }) =>
                            setFilters({
                                ...filters,
                                filterValue: parseInt(e.target.value),
                            })
                        }
                    />
                </div>
                <Button
                    size="sm"
                    className="ml-auto my-5"
                    ripple="light"
                    color="red"
                    onClick={() =>
                        setFilters({
                            ...filters,
                            sortValue: -filters.sortValue,
                        })
                    }
                >
                    <Icon
                        name={
                            filters.sortValue === -1
                                ? 'arrow_upward'
                                : 'arrow_downward'
                        }
                        size="sm"
                    />{' '}
                    Sort by date published
                </Button>
            </div>

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

            <div className="m-auto">
                {!lastPage && (
                    <Button
                        size="sm"
                        className="mx-auto"
                        ripple="light"
                        color="red"
                        onClick={() => loadNextPage()}
                    >
                        Show more ...
                    </Button>
                )}
            </div>
        </div>
    )
}
