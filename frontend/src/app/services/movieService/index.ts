import { FetchResult } from '@apollo/client'
import { ApolloQueryResult } from '@apollo/client/core/types'
import { apolloClient } from '../../graphql'
import {
    CREATE_MOVIE,
    GET_MOVIES,
    GET_MOVIE_BY_ID,
    SEARCH_MOVIES,
    SORT_MOVIES,
    UPDATE_MOVIE,
} from './queries'
import { CreateMovie } from './__generated__/CreateMovie'
import { DeleteMovie } from './__generated__/DeleteMovie'
import { FindMovie } from './__generated__/FindMovie'
import { GetMovies } from './__generated__/GetMovies'
import { SearchMovies } from './__generated__/SearchMovies'
import { SortMovies } from './__generated__/SortMovies'
import { UpdateMovie } from './__generated__/UpdateMovie'

export class MovieService {
    async getMovies(): Promise<GetMovies['getmovies']> {
        try {
            const response: ApolloQueryResult<GetMovies> =
                await apolloClient.query({
                    query: GET_MOVIES,
                })

            if (!response || !response.data)
                throw new Error('Cannot get movie list!')

            return response.data.getmovies
        } catch (err) {
            console.error(err)
            throw err
        }
    }


    // async getMoviesPage (
    //     variables: GetMoviesPageVariables
    // ): Promise<GetMoviesPage['getmoviespage']> {
    //     try {
    //
    //         const response: ApolloQueryResult<GetMoviesPage> =
    //             await apolloClient.query({
    //                 query: FEED_QUERY,
    //                 variables: variables,
    //             })
    //
    //         if (!response || !response.data)
    //             throw new Error('Cannot get movie page!')
    //
    //         return response.data.getmoviespage
    //     } catch (err) {
    //         console.error(err)
    //         throw err
    //     }
    // }

    async findMovie(_id: string): Promise<FindMovie['findMovie']> {
        try {
            console.warn('ID: ', _id)

            const response: ApolloQueryResult<FindMovie> =
                await apolloClient.query({
                    query: GET_MOVIE_BY_ID,
                    variables: { _id },
                })

            if (!response || !response.data)
                throw new Error('Cannot get movie list!')

            return response.data.findMovie
        } catch (err) {
            console.error(err)
            throw err
        }
    }



    async createMovie(
        title: string,
        description: string,
        published: number,
    ): Promise<CreateMovie['createMovie']> {
        try {
            const response: FetchResult<CreateMovie> =
                await apolloClient.mutate({
                    mutation: CREATE_MOVIE,
                    variables: { title, description, published },
                })

            if (!response || !response.data)
                throw new Error('Cannot get movie list!')

            return response.data.createMovie
        } catch (err) {
            console.error(err)
            throw err
        }
    }

    async updateMovie(
        _id: string,
        title: string,
        description: string,
        published: number,
    ): Promise<UpdateMovie['updateMovie']> {
        try {
            const response: FetchResult<UpdateMovie> =
                await apolloClient.mutate({
                    mutation: UPDATE_MOVIE,
                    variables: { _id, title, description, published },
                })

            if (!response || !response.data)
                throw new Error('Cannot get movie list!')

            return response.data.updateMovie
        } catch (err) {
            console.error(err)
            throw err
        }
    }

    async deleteMovie(_id: string): Promise<DeleteMovie['deleteMovie']> {
        try {
            const response: FetchResult<DeleteMovie> =
                await apolloClient.mutate({
                    mutation: GET_MOVIES,
                    variables: { _id },
                })

            if (!response || !response.data)
                throw new Error('Cannot get movie list!')

            return response.data.deleteMovie
        } catch (err) {
            console.error(err)
            throw err
        }
    }

    async searchMovie(
        searchQuery: string,
    ): Promise<SearchMovies['searchMovies']> {
        try {
            const response: ApolloQueryResult<SearchMovies> =
                await apolloClient.query({
                    query: SEARCH_MOVIES,
                    variables: { searchQuery },
                })

            if (!response || !response.data)
                throw new Error('Cannot get movie list!')

            return response.data.searchMovies
        } catch (err) {
            console.error(err)
            throw err
        }
    }

    // async searchMoviesPage (
    //     variables: GetMoviesPageVariables
    // ): Promise<GetMoviesPage['getmoviespage']> {
    //     try {
    //
    //         const response: ApolloQueryResult<GetMoviesPage> =
    //             await apolloClient.query({
    //                 query: FEED_QUERY,
    //                 variables: variables,
    //             })
    //
    //         if (!response || !response.data)
    //             throw new Error('Cannot get movie page!')
    //
    //         return response.data.getmoviespage
    //     } catch (err) {
    //         console.error(err)
    //         throw err
    //     }
    // }

    async sortMovie(input: number): Promise<SortMovies['sortMovies']> {
        try {
            const response: ApolloQueryResult<SortMovies> =
                await apolloClient.query({
                    query: SORT_MOVIES,
                    variables: { input },
                })

            if (!response || !response.data)
                throw new Error('Cannot sort movie!')

            return response.data.sortMovies
        } catch (err) {
            console.error(err)
            throw err
        }
    }


}

export default new MovieService()
