import gql from "graphql-tag";

export const GET_MOVIE_PAGE = gql`
  query GetMoviePage($page: Int!, $perPage: Int!) {
    Page(page: $page, perPage: $perPage) {
      media {
        id
        description
        averageScore
        title {
          english
        }
        coverImage {
          extraLarge
        }
      }
    }
  }
`;
