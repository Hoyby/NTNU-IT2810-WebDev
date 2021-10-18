/* eslint-disable */
import { createSelector } from "reselect"
import { IRootState } from "../../types"

const selectLandingPage = (state: any) => state.landingPage // TODO: change type to IRootState

export const makeSelectMoviePage = createSelector(
    selectLandingPage, 
    (landingPage) => landingPage.moviePage)
