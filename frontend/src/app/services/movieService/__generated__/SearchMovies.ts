/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SearchMovies
// ====================================================

export interface SearchMovies_searchMovies {
  __typename: "MovieDto";
  _id: string;
  title: string;
  description: string;
}

export interface SearchMovies {
  searchMovies: SearchMovies_searchMovies[];
}

export interface SearchMoviesVariables {
  searchQuery: string;
}
