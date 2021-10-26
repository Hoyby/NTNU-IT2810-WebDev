import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { GetMovies } from '../../services/movieService/__generated__/GetMovies'
import { IMoviePageState } from './types'

const initialState: IMoviePageState = {
    moviePage: [],
}

const HomePageSlice = createSlice({
    name: 'moviePage',
    initialState,
    reducers: {
        setMoviePage(state, action: PayloadAction<GetMovies['getmovies']>) {
            if (action) state.moviePage = action.payload
        },
    },
})

export const { setMoviePage: setMoviePage } = HomePageSlice.actions
export default HomePageSlice.reducer
