import React from 'react'
import MovieForm from './MovieForm'
import Search from './Search'

export default function Dashboard() {
    return (
        <div>
            <div className="my-10">
                <MovieForm />
            </div>

            <Search />
        </div>
    )
}
