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
// @ts-ignore
import Input from "@material-tailwind/react/Input";
// @ts-ignore
import Dropdown from "@material-tailwind/react/Dropdown"
// @ts-ignore
import DropdownItem from "@material-tailwind/react/DropdownItem"
// @ts-ignore
import DropdownLink from "@material-tailwind/react/DropdownLink"
// @ts-ignore
import H6 from "@material-tailwind/react/Heading6"
import {useHistory} from "react-router-dom";
import { SearchMoviesPage_searchMoviesPage } from '../services/movieService/__generated__/SearchMoviesPage'

/* eslint-enable */

export function Search() {
    // let timer: NodeJS.Timeout

    const LINKS_PER_PAGE = 6;
    const INITIAL_PAGE = 1;

    const [sortValue, setSortValue] = useState(-1)

    const [filterField, setFilterField] = useState('published')
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [filterCond, setFilterCond] = useState('$lte')
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [filterValue, setFilterValue] = useState(2000)

    const [searchResult, setSearchResult] =
        useState<SearchMovies['searchMovies']>([])

    const [searchInput, setSearchInput] = useState<string>('')

    const [page, setPage] = useState(INITIAL_PAGE)

    const loadNextPage = () => {
        setPage(page + 1)
    }

    const appendSearchResult = (queryResult: SearchMoviesPage_searchMoviesPage[]) => {
        setSearchResult(searchResult?.concat(queryResult))
    }


    const getQueryVariables = (page: number) => {
        const skip = (page - 1) * LINKS_PER_PAGE;
        const take = LINKS_PER_PAGE;
        const orderField = 'published';
        const orderValue = sortValue;
        return { take, skip, orderField, orderValue, filterField, filterCond, filterValue};
    };

    // const fetchSearchResults = async (query: string) => {
    //     setPage(INITIAL_PAGE)
    //     const query_variables = getQueryVariables(page)
    //     const final_query = {
    //         searchQuery: query,
    //         take: query_variables.take,
    //         skip: query_variables.skip,
    //         orderField: query_variables.orderField,
    //         orderValue: query_variables.orderValue,
    //         filterField: query_variables.filterField,
    //         filterCond: query_variables.filterCond,
    //         filterValue: query_variables.filterValue
    //     }
    //     const queryResult = await MovieService.searchMoviesPage(final_query).catch(
    //         (err: Error) => {
    //             console.error(err)
    //         },
    //     )
    //     if (queryResult) setSearchResult(queryResult)
    // }

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
            filterValue: query_variables.filterValue
        }
        const queryResult = await MovieService.searchMoviesPage(final_query).catch(
            (err: Error) => {
                console.error(err)
            },
        )
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
            filterValue: query_variables.filterValue
        }
        const queryResult = await MovieService.searchMoviesPage(final_query).catch(
            (err: Error) => {
                console.error(err)
            },
        )
        if (queryResult) appendSearchResult(queryResult)
    }

    // const fetchAndAppendSearchResults = async (query: string) => {
    //     const query_variables = getQueryVariables(page)
    //     const final_query = {
    //         searchQuery: query,
    //         take: query_variables.take,
    //         skip: query_variables.skip,
    //         orderField: query_variables.orderField,
    //         orderValue: query_variables.orderValue,
    //         filterField: query_variables.filterField,
    //         filterCond: query_variables.filterCond,
    //         filterValue: query_variables.filterValue
    //     }
    //     const queryResult = await MovieService.searchMoviesPage(final_query).catch(
    //         (err: Error) => {
    //             console.error(err)
    //         },
    //     )
    //     if (queryResult) appendSearchResult(queryResult)
    // }

    // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     event.preventDefault()
    //     clearTimeout(timer)
    //     timer = setTimeout(() => {
    //         fetchSearchResults(event.target.value).catch((err) => {
    //             console.error(err)
    //             throw err
    //         })
    //     }, 700)
    // }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
    }

    useEffect(() => {
        setPage(INITIAL_PAGE)
        fetchSearchResults().catch((err) => {
            console.error(err)
            throw err
        })
    }, [sortValue, filterField, filterCond, filterValue, searchInput])

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
                    onChange={(e: { target: { value: string } }) => setSearchInput(e.target.value)}
                />
            </form>
            {
                /*onChange={handleInputChange}*/
            }
            <H6 color='white'>Filter</H6>
            <div className='relative flex items-center justify-between'>
                <div className='pr-5'>
                    <Dropdown
                        color="red"
                        placement="bottom-start"
                        buttonText={filterField=='published' ? 'Date published' : 'Date added'}
                        buttonType="outline"
                        size="regular"
                        rounded={false}
                        block={false}
                        ripple="dark"
                    >
                        <DropdownLink
                            href="#"
                            color='red'
                            ripple="light"
                            onClick={() => setFilterField('createdAt')}
                        >
                            Date added
                        </DropdownLink>
                        <DropdownLink
                            href="#"
                            color='red'
                            ripple="light"
                            onClick={() => setFilterField('published')}
                        >
                            Date published
                        </DropdownLink>
                    </Dropdown>
                </div>

                <div className='pr-5'>
                    <Dropdown
                        color="yellow"
                        placement="bottom-start"
                        buttonText={filterCond=='$lte' ? '<' : '>'}
                        buttonType="outline"
                        size="regular"
                        rounded={false}
                        block={false}
                        ripple="dark"
                    >
                        <DropdownLink
                            href="#"
                            color='yellow'
                            ripple="light"
                            onClick={() => setFilterCond('$lte')}
                        >
                            {'<'}
                        </DropdownLink>
                        <DropdownLink
                            href="#"
                            color='yellow'
                            ripple="light"
                            onClick={() => setFilterCond('$gte')}
                        >
                            {'>'}
                        </DropdownLink>
                    </Dropdown>
                </div>

                <div className='pr-10'>

                    <Input
                        type="text"
                        color="yellow"
                        size="regular"
                        outline={true}
                        placeholder={filterValue}
                        onChange={(e: { target: { value: string } }) => setFilterValue(parseInt(e.target.value))}
                    />
                </div>
                <Button
                    size="sm"
                    className="ml-auto my-5"
                    ripple="light"
                    color="red"
                    onClick={() => {
                        setSortValue(-sortValue)
                    }}
                >
                    <Icon name="sort" size="sm" /> Sort by date published
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

            <div className='pb-10'>
                <Button
                    size="sm"
                    className="ml-auto my-5"
                    ripple="light"
                    color="red"
                    onClick={() => loadNextPage()}>
                    Load more
                </Button>
            </div>
        </>
    )
}

export default Search
