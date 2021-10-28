/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: search
// ====================================================

export interface search_searchMovie {
  __typename: "MovieDto";
  _id: string;
  title: string;
  published: number;
}

export interface search {
  searchMovie: search_searchMovie[];
}

export interface searchVariables {
  input: string;
}
