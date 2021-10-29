/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SortMovies
// ====================================================

export interface SortMovies_sortMovies {
  __typename: "MovieDto";
  _id: string;
  title: string;
  description: string;
}

export interface SortMovies {
  sortMovies: SortMovies_sortMovies[];
}

export interface SortMoviesVariables {
  input: number;
}
