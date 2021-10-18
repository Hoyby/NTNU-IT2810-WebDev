/* eslint-disable */
import { createSlice } from "@reduxjs/toolkit";
// import { GetMoviePage } from "../../services/movieService/__generated__/GetMoviePage"
import { ILandingPageState } from "./types";

const initialState: ILandingPageState = {
    moviePage: null,
}

const LandingPageSlice = createSlice({
    name: "LandingPage",
    initialState,
    reducers: {
        setMoviePage(state, action) {
            state.moviePage = action.payload
        }
    }
}
)

export const { setMoviePage } = LandingPageSlice.actions
export default LandingPageSlice.reducer