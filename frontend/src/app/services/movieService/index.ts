import { ApolloQueryResult } from '@apollo/client/core/types'
import { apolloClient } from '../../graphql'
import {
    CREATE_MOVIE,
    GET_MOVIES,
    GET_MOVIE_BY_ID,
    SEARCH,
    SORT,
    UPDATE_MOVIE,
} from './queries'
import { CreateMovie } from './__generated__/CreateMovie'
import { DeleteMovie } from './__generated__/DeleteMovie'
import { FindMovie } from './__generated__/FindMovie'
import { GetMovies } from './__generated__/GetMovies'
import { search } from './__generated__/search'
import { sort } from './__generated__/sort'
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
            const response: ApolloQueryResult<CreateMovie> =
                await apolloClient.query({
                    query: CREATE_MOVIE,
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
    ): Promise<UpdateMovie['createMovie']> {
        try {
            const response: ApolloQueryResult<UpdateMovie> =
                await apolloClient.query({
                    query: UPDATE_MOVIE,
                    variables: { _id, title, description, published },
                })

            if (!response || !response.data)
                throw new Error('Cannot get movie list!')

            return response.data.createMovie
        } catch (err) {
            console.error(err)
            throw err
        }
    }

    async deleteMovie(_id: string): Promise<DeleteMovie['deleteMovie']> {
        try {
            const response: ApolloQueryResult<DeleteMovie> =
                await apolloClient.query({
                    query: GET_MOVIES,
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
    
    async searchMovie(input: string): Promise<search['searchMovie']>{
        try{
            const response: ApolloQueryResult<search> = 
                await apolloClient.query({
                    query: SEARCH,
                    variables: {input},
                })

            if(!response || !response.data)
                throw new Error('Cannot get movie list!')
    
            return response.data.searchMovie
        } catch(err) {
            console.error(err)
            throw err
        }
    }

    async sortMovie(input: number): Promise<sort['sortMovie']>{
        try{
            const response: ApolloQueryResult<sort> = 
                await apolloClient.query({
                    query: SORT,
                    variables: {input},
                })
            
            if(!response || !response.data)
                throw new Error('Cannot sort movie!')
            
            return response.data.sortMovie
        } catch(err) {
            console.error(err)
            throw err
        }
    }

}

export default new MovieService()
