import React from 'react'
import {useParams} from "react-router-dom";
// import {GET_MOVIE_BY_ID} from "../services/movieService/queries";

export default function MovieDetail() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { id } = useParams();

    return (
        <>
            <h1>{id}</h1>
        </>
    )
}
