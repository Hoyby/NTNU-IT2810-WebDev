import { createSelector } from "reselect";
import { IRootState } from "../../types";

const selectHomePage = (state: IRootState) => state.homePage;

export const makeSelectMoviePage = createSelector(
  selectHomePage,
  (homePage) => homePage.moviePage
);
