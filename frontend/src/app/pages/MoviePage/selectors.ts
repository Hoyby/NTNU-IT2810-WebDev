import { createSelector } from 'reselect'
import { IRootState } from '../../types'

const selectMoviePage = (state: IRootState) => state.homePage

export const makeSelectMoviePage = createSelector(
    selectMoviePage,
    (moviePage) => moviePage.moviePage,
)
