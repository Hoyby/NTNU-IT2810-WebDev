import React, {useEffect, useState} from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import MovieService from '../services/movieService'
import { SearchMovies } from '../services/movieService/__generated__/SearchMovies'
import MovieDetail from './MovieDetail'

export function Searchbar() {
    let timer: NodeJS.Timeout

    const [sortValue, setSortVaue] = useState(-1)

    const [searchResult, setSearchResult] =
        useState<SearchMovies['searchMovies']>()
    
    const [searchinput, setSearchInput] = useState<string>()

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
            //console.warn(sortvalue)
        }, 500)
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
    }


    
    const change = () => { 
        setSortVaue(-sortValue)
    }

    useEffect(() => {
        if(searchinput != null){
            fetchSearchResults(searchinput).catch((err) => {
                console.error(err)
                throw err
            })
        }
    }, [sortValue]);


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
            <button type="button" className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" onClick={change}>Sort</button>

            <div className="max-w-screen-xl w-full h-full flex justify-evenly flex-wrap">
                {searchResult &&
                    searchResult.map((movie) => (
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
