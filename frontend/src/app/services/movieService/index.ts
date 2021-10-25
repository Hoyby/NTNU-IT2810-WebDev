import { ApolloQueryResult } from '@apollo/client/core/types'
import { apolloClient } from '../../graphql'
import { GET_MOVIES } from './queries'
import { GetMovies } from './__generated__/GetMovies'

class MovieService {
    async getMovies(): Promise<GetMovies['getmovies']> {
        try {
            const response: ApolloQueryResult<GetMovies> =
                await apolloClient.query({
                    query: GET_MOVIES,
                    // variables: { page, perPage },
                })

            if (!response || !response.data)
                throw new Error('Cannot get movie list!')

            // console.log("DATA: ", response.data);
            return response.data.getmovies
        } catch (err) {
            console.error(err)
            throw err
        }
    }
}

export default new MovieService()
