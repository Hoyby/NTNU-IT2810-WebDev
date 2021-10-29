import React, {useEffect, useState} from 'react'
import MovieService from '../services/movieService'
import { SearchMovies } from '../services/movieService/__generated__/SearchMovies'
import { MovieCard } from './MovieCard'
// material-tailwind is not officially supported by TS - hence the ignores
/* eslint-disable */
// @ts-ignore
import InputIcon from '@material-tailwind/react/InputIcon'
/* eslint-enable */

export function Searchbar() {
    let timer: NodeJS.Timeout

    const [sortValue, setSortVaue] = useState(-1)

    const [searchResult, setSearchResult] =
        useState<SearchMovies['searchMovies']>()

    const [searchInput, setSearchInput] = useState<string>()

    const fetchSearchResults = async (query: string) => {
        setSearchInput(query)
        const queryResult = await MovieService.searchandSortMovie(query, sortValue).catch(
            (err: Error) => {
                console.error(err)
            },
        )
        if (queryResult) setSearchResult(queryResult)
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement> ) => {
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



    const change = () => {
        setSortVaue(-sortValue)
    }

    useEffect(() => {
        if(searchInput != null){
            fetchSearchResults(searchInput).catch((err) => {
                console.error(err)
                throw err
            })
        }
    }, [sortValue]);

    useEffect(() => {
        if(searchInput != null){
            fetchSearchResults(searchInput).catch((err) => {
                console.error(err)
                throw err
            })
        }
    }, [sortValue]);

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
            <button type="button" className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" onClick={change}>Sort</button>

            <div className="max-w-screen-xl w-full h-full flex justify-evenly flex-wrap mb-10">
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

export default Searchbar
