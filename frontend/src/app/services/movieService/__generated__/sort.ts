/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: sort
// ====================================================

export interface sort_sortMovie {
  __typename: "MovieDto";
  _id: string;
  title: string;
  description: string;
}

export interface sort {
  sortMovie: sort_sortMovie[];
}

export interface sortVariables {
  input: number;
}
