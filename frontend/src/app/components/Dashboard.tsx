import React from 'react'
import { MoviePage } from '../pages/MoviePage'
import MovieForm from './MovieForm'

export default function Dashboard() {
    return (
        <div>
            <MoviePage />
            <MovieForm />
        </div>
    )
}
