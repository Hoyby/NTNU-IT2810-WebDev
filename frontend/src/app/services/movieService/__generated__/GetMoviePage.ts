/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetMoviePage
// ====================================================

export interface GetMoviePage_Page_media_title {
  __typename: "MediaTitle";
  /**
   * The official english title
   */
  english: string | null;
}

export interface GetMoviePage_Page_media_coverImage {
  __typename: "MediaCoverImage";
  /**
   * The cover image url of the media at its largest size. If this size isn't available, large will be provided instead.
   */
  extraLarge: string | null;
}

export interface GetMoviePage_Page_media {
  __typename: "Media";
  /**
   * The id of the media
   */
  id: number;
  /**
   * Short description of the media's story and characters
   */
  description: string | null;
  /**
   * A weighted average score of all the user's scores of the media
   */
  averageScore: number | null;
  /**
   * The official titles of the media in various languages
   */
  title: GetMoviePage_Page_media_title | null;
  /**
   * The cover images of the media
   */
  coverImage: GetMoviePage_Page_media_coverImage | null;
}

export interface GetMoviePage_Page {
  __typename: "Page";
  media: (GetMoviePage_Page_media | null)[] | null;
}

export interface GetMoviePage {
  Page: GetMoviePage_Page | null;
}

export interface GetMoviePageVariables {
  page: number;
  perPage: number;
}
