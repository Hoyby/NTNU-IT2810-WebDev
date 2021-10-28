import React, { useEffect, useState } from 'react'
import { MovieService } from '../services/movieService'
import { search_searchMovie } from '../services/movieService/__generated__/search'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
//import InputIcon from "@material-tailwind/react/InputIcon";

/*

interface ISearchBarProps {
    className?: string,
    placeholder?: string
}

function Searchbar({className, placeholder}: ISearchBarProps) {
    return (
        <div className={className}>
            <InputIcon
                type='text'
                color='amber'
                size='lg'
                outline={true}
                placeholder={placeholder}
                iconFamily="material-icons"
                iconName="search"
            />
        </div>
)
}
*/

const { search } = window.location
const query = new URLSearchParams(search).get('s')

export function Searchbar(){

    const [movies, setSearchQuery] = useState<search_searchMovie[]>()
    let queryResult: React.SetStateAction<search_searchMovie[] | undefined> | null = null
    const movieService = new MovieService()



    //handle error input
    async function fetchMovie(){
        if(query)
            queryResult = await movieService.searchMovie(query).catch((err: Error) => {
                console.error(err)
                throw err
            })
            if(queryResult) setSearchQuery(queryResult)
            console.warn(queryResult)
    }

    useEffect(() => {
        return () => {
            fetchMovie().catch((err: Error) => {
                console.error(err.message)
                throw err
            })
        };
    }, );



    return (
        <>
        <form action="/" method="get">
            <label htmlFor="header-search">
                <span className="visually-hidden">Search</span>
            </label>
            <input
                type="text"
                id="header-search"
                placeholder="Search Movies"
                name="s" 
                className="text-black"
            />
            <button type="submit">Search</button>
        </form>
        <div>
            {movies &&
                movies.map((movie) => (
                    <div className="w-64 mb-10 flex flex-col items-center">
                        <div className="mt-4 text-center">{movie?.title}</div>
                    </div>
                ))}
        </div>
        </>
    )
}

export default Searchbar
