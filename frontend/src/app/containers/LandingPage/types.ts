import { GetMoviePage } from "../../services/movieService/__generated__/GetMoviePage";

export interface ILandingPageState {
    moviePage: GetMoviePage["Page"]
}