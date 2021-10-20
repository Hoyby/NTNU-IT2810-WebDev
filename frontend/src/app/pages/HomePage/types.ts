import { GetMoviePage } from "../../services/movieService/__generated__/GetMoviePage";

export interface IHomePageState {
  moviePage: GetMoviePage["Page"];
}
