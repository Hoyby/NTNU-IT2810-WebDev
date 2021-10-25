import { GetMovies } from '../../services/movieService/__generated__/GetMovies'

export interface IHomePageState {
    moviePage: GetMovies['getmovies']
}
