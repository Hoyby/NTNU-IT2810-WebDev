import React, {useEffect, useState} from 'react'
import {useParams} from "react-router-dom";
import { MovieService } from "../services/movieService";
import {FindMovie_findMovie} from "../services/movieService/__generated__/FindMovie";

export default function MovieDetail() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { id } = useParams();
    const movieService = new MovieService()
    const [movie, setMovie] = useState<FindMovie_findMovie>();
    let queryResult: React.SetStateAction<FindMovie_findMovie | undefined> | null = null





    useEffect(() => {
        async function fetchMovie() {
            queryResult = await movieService.findMovie(id)
            setMovie(queryResult)
        }

        fetchMovie().catch((err: Error) => {
            console.error(err.message)
            throw err
        })
    }, );

    return (
        <>
            <h1>{id}</h1>
            <h1>{movie ? movie.title : 'No movie'}</h1>
        </>
    )
}
