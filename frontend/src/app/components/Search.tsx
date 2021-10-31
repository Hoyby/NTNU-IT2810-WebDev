import React, { useEffect, useState } from 'react'
import MovieService from '../services/movieService'
import { MovieCard } from './MovieCard'
import { useAppDispatch, useAppSelector } from '../hooks'
import { Dispatch } from '@reduxjs/toolkit'
import { setSearchPage } from '../slices/searchPageSlice'
import { SearchMoviesPage } from '../services/movieService/__generated__/SearchMoviesPage'

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
    setSearchResult: (page: SearchMoviesPage['searchMoviesPage']) => dispatch(setSearchPage(page)),
})

export default function Search() {
    const movieService = new MovieService()

    const ELEMENTS_PER_PAGE = 6
    const PAGE_OFFSET = 1

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

    const initialPageState: {
        hasNextPage: boolean
        page: number
    } = {
        hasNextPage: false,
        page: PAGE_OFFSET,
    }

    const [filters, setFilters] = useState(initialFilters)
    const [pageState, setPageState] = useState(initialPageState)

    // Set new redux seach page state
    const { setSearchResult: setSearchResult } = actionDispatch(useAppDispatch())

    // Current redux seach page state
    const searchResult = useAppSelector((state) => state.searchPage.searchPage)

    const [searchInput, setSearchInput] = useState<string>('')

    const appendSearchResult = (queryResult: SearchMoviesPage['searchMoviesPage']) => {
        setSearchResult(searchResult?.concat(queryResult))
    }

    const getQueryVariables = (page: number) => {
        const skip = (page - 1) * ELEMENTS_PER_PAGE
        const take = ELEMENTS_PER_PAGE
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
        setPageState({
            ...pageState,
            page: PAGE_OFFSET,
        })
        const query_variables = getQueryVariables(1)
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
        const queryResult = await movieService.searchMoviesPage(final_query).catch((err: Error) => {
            console.error(err)
        })
        if (queryResult) setSearchResult(queryResult)
    }

    const fetchMore = async () => {
        const query_variables = getQueryVariables(pageState.page)
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
        const queryResult = await movieService.searchMoviesPage(final_query).catch((err: Error) => {
            console.error(err)
        })
        if (queryResult) appendSearchResult(queryResult)
        if (queryResult?.length == 0)
            setPageState({
                ...pageState,
                hasNextPage: true,
            })
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
    }

    let timer: NodeJS.Timeout

    const handeSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            setSearchInput(event.target.value)
        }, 700)
    }

    useEffect(() => {
        setPageState({
            ...pageState,
            page: PAGE_OFFSET,
        })
        setPageState({
            ...pageState,
            hasNextPage: false,
        })
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
        setPageState({
            ...pageState,
            hasNextPage: false,
        })
        if (pageState.page != PAGE_OFFSET) {
            fetchMore().catch((err) => {
                console.error(err)
                throw err
            })
        }
    }, [pageState.page])

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
                {/* Search Bar */}
                <div className="w-full relative h-12">
                    <span
                        role="text"
                        id="searchbar"
                        className="material-icons p-0 text-gray-600 text-opacity-60 border-none absolute top-1/2 right-3 transform -translate-y-1/2 text-xl"
                    >
                        search
                    </span>
                    <input
                        type="text"
                        name="searchbar"
                        id="searchbar"
                        onChange={handeSearchChange}
                        className="w-full h-full text-gray-500 outline-none focus:text-white pl-3 pr-9 pt-3.5 pb-2.5 mt-input-outline bg-transparent border border-1 border-gray-300 rounded-lg focus:border-2"
                    />
                    <label
                        htmlFor="searchbar"
                        className="text-white absolute left-0 -top-1.5 w-full h-full border-gray-300 pointer-events-none false flex false leading-10"
                    >
                        Search Movies
                    </label>
                </div>
            </form>
            <div className="relative sm:flex items-center">
                <div className="pr-5">
                    <Dropdown
                        color="red"
                        className="whitespace-nowrap mb-4"
                        buttonText={
                            filters.filterField == 'published' ? 'Date Published' : 'Date Added'
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
                            Date Added
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
                        buttonText={filters.filterCond == '$lte' ? 'Before' : 'After'}
                        buttonType="outline"
                        className="mb-4"
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
                    <label htmlFor="yearFilter" />
                    <input
                        type="number"
                        min="1800"
                        max="2099"
                        step="1"
                        color="yellow"
                        id="yearFilter"
                        name="yearFilter"
                        className="w-70 h-full text-gray-200 appearance-none overflow-visible outline-none focus:outline-none focus:text-white mb-4 pl-3 pr-3 py-2.5 text-sm border-gray-300 bg-transparent border border-1 rounded-lg focus:border-2 focus:border-yellow-600"
                        placeholder={filters.filterValue.toString()}
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
                    className="sm:ml-auto mb-4 whitespace-nowrap"
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
                        name={filters.sortValue === -1 ? 'arrow_upward' : 'arrow_downward'}
                        size="sm"
                    />{' '}
                    Sort by date published
                </Button>
            </div>

            <div className="max-w-screen-xl w-full h-full flex justify-between flex-wrap gap-8 mb-10">
                {searchResult &&
                    searchResult.map((movie) => (
                        <MovieCard
                            key={movie?._id}
                            title={movie?.title}
                            description={movie?.description}
                            _id={movie?._id}
                        />
                    ))}
            </div>

            <div className="m-auto">
                {!pageState.hasNextPage && (
                    <Button
                        size="sm"
                        className="mx-auto"
                        ripple="light"
                        color="red"
                        onClick={() =>
                            setPageState({
                                ...pageState,
                                page: pageState.page + 1,
                            })
                        }
                    >
                        Show more ...
                    </Button>
                )}
            </div>
        </div>
    )
}
