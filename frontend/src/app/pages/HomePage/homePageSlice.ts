import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GetMoviePage_Page } from "../../services/movieService/__generated__/GetMoviePage";
import { IHomePageState } from "./types";

const initialState: IHomePageState = {
  moviePage: null,
};

const HomePageSlice = createSlice({
  name: "homePage",
  initialState,
  reducers: {
    setMoviePage(state, action: PayloadAction<GetMoviePage_Page | null>) {
      if (action)
        state.moviePage = action.payload;
    },
  },
});

export const { setMoviePage: setMoviePage } = HomePageSlice.actions;
export default HomePageSlice.reducer;
