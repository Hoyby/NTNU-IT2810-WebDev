/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SearchMoviesPage
// ====================================================

export interface SearchMoviesPage_searchMoviesPage {
  __typename: "MovieDto";
  _id: string;
  title: string;
  description: string;
  published: number;
  updatedAt: any;
  createdAt: any;
}

export interface SearchMoviesPage {
  searchMoviesPage: SearchMoviesPage_searchMoviesPage[];
}

export interface SearchMoviesPageVariables {
  searchQuery: string;
  take?: number | null;
  skip?: number | null;
  orderBy?: string | null;
}
