/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateMovie
// ====================================================

export interface UpdateMovie_createMovie {
  __typename: "MovieDto";
  title: string;
  description: string;
  published: number;
  updatedAt: any;
}

export interface UpdateMovie {
  createMovie: UpdateMovie_createMovie;
}

export interface UpdateMovieVariables {
  _id: string;
  title?: string | null;
  description?: string | null;
  published?: number | null;
}
