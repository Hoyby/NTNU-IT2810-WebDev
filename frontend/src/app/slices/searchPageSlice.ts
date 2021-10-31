import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SearchAndSortMovies } from '../services/movieService/__generated__/SearchAndSortMovies'

/**
 * Redux search slice
 */

export interface ISearchResultState {
    searchPage: SearchAndSortMovies['searchandSortMovie'] // Array of movies
}

const initialState: ISearchResultState = {
    searchPage: [], // Initialize with 0 movies
}

const SearchPageSlice = createSlice({
    name: 'searchPage',
    initialState,
    reducers: {
        setSearchPage(
            state,
            action: PayloadAction<SearchAndSortMovies['searchandSortMovie']>,
        ) {
            if (action) state.searchPage = action.payload // Set new state with the value of action
        },
    },
})

export const { setSearchPage: setSearchPage } = SearchPageSlice.actions
export default SearchPageSlice.reducer
