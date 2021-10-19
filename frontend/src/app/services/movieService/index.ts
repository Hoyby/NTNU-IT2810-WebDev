import { apolloClient } from "../../graphql";
import { GET_MOVIE_PAGE } from "./queries";
import { GetMoviePage } from "./__generated__/GetMoviePage";

class MovieService {
  async getMoviePage(page: Number, perPage = 5): Promise<GetMoviePage["Page"]> {
    try {
      const response = await apolloClient.query({
        query: GET_MOVIE_PAGE,
        variables: { page, perPage },
      });

      if (!response || !response.data)
        throw new Error("Cannot get movie list!");

      console.log("DATA: ", response.data);

      return response.data.Page;
    } catch (err) {
      throw err;
    }
  }
}

export default new MovieService();
