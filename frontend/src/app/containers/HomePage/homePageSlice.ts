import { createSlice } from "@reduxjs/toolkit";
import { IHomePageState } from "./types";

const initialState: IHomePageState = {
  moviePage: null,
};

const HomePageSlice = createSlice({
  name: "homePage",
  initialState,
  reducers: {
    setMoviePage(state, action) {
      state.moviePage = action.payload;
    },
  },
});

export const { setMoviePage: setMoviePage } = HomePageSlice.actions;
export default HomePageSlice.reducer;
