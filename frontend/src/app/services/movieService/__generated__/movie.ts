/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: movie
// ====================================================

export interface movie_searchandSortMovie {
  __typename: "MovieDto";
  _id: string;
  title: string;
  description: string;
}

export interface movie {
  searchandSortMovie: movie_searchandSortMovie[];
}

export interface movieVariables {
  searchword: string;
  sortfactor: number;
}
