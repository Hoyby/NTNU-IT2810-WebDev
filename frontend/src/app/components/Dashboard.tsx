import React from 'react'
import MovieForm from './MovieForm'
import Searchbar from './Searchbar'

export default function Dashboard() {
    return (
        <div>
            <div className="my-10">
                <MovieForm />
            </div>

            <Searchbar />
        </div>
    )
}
