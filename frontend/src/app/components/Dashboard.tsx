import React from 'react'
import { MoviePage } from '../pages/MoviePage'
import MovieForm from './MovieForm'
import Searchbar from './Searchbar'

export default function Dashboard() {
    return (
        <div>
            <MoviePage />
            <Searchbar/>
            <MovieForm />
        </div>
    )
}
