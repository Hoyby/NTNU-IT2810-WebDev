/* eslint-disable */
import { apolloClient } from "../../graphql";
import { GET_MOVIE_PAGE } from "./queries";
import { GetMoviePage } from "./__generated__/GetMoviePage";

class MovieService {
    async getMoviePage(page: number, perPage = 5): Promise<GetMoviePage["Page"]> {
        try {
            const response = await apolloClient.query({ query: GET_MOVIE_PAGE, variables: { page, perPage } })

            if (!response || !response.data)
                throw new Error("Cannot get movie list")

            return response.data

        } catch (err) {
            console.error(err)
            throw err;
        }
    }
}

export default new MovieService();