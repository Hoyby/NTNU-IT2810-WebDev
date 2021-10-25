import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GetMovies, GetMovies_getmovies } from "../../services/movieService/__generated__/GetMovies";
import { IHomePageState } from "./types";

const initialState: IHomePageState = {
  moviePage: [],
};

const HomePageSlice = createSlice({
  name: "homePage",
  initialState,
  reducers: {
    setMoviePage(state, action: PayloadAction<GetMovies['getmovies']>) {
      if (action)
        state.moviePage = action.payload;
    },
  },
});

export const { setMoviePage: setMoviePage } = HomePageSlice.actions;
export default HomePageSlice.reducer;
