/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetMovies
// ====================================================

export interface GetMovies_getmovies {
  __typename: "MovieDto";
  _id: string;
  title: string;
  description: string;
  published: number;
  createdAt: any;
  updatedAt: any;
}

export interface GetMovies {
  getmovies: GetMovies_getmovies[];
}
