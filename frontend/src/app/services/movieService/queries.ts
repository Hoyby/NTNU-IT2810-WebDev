// eslint-disable-next-line import/no-named-as-default
import gql from 'graphql-tag'

export const GET_MOVIES = gql`
    query GetMovies {
        getmovies {
            _id
            title
            description
            published
            updatedAt
            createdAt
        }
    }
`

export const GET_MOVIE_BY_ID = gql`
    query FindMovie($_id: String!) {
        findMovie(input: { _id: $_id }) {
            title
            description
            published
            updatedAt
            createdAt
        }
    }
`

export const SEARCH_MOVIES = gql`
    query SearchMovies($searchQuery: String!) {
        searchMovies(input: $searchQuery) {
            _id
            title
            description
        }
    }
`;

export const SEARCH_MOVIES_PAGE = gql`
  query SearchMoviesPage(
    $searchQuery: String!
    $take: Float!
    $skip: Float!
    $orderField: String!
    $orderValue: String!
  ) {
    searchMoviesPage(input: {searchQuery: $searchQuery, take: $take, skip: $skip, orderField: $orderField, orderValue: $orderValue}) {
      _id
      title
      description
      published
      updatedAt
      createdAt
    }
  }
`
export const CREATE_MOVIE = gql`
    mutation CreateMovie(
        $title: String!
        $description: String!
        $published: Int!
    ) {
        createMovie(
            input: {
                title: $title
                description: $description
                published: $published
            }
        ) {
            title
            description
            published
            updatedAt
            createdAt
        }
    }
`

export const UPDATE_MOVIE = gql`
    mutation UpdateMovie(
        $_id: String!
        $title: String!
        $description: String!
        $published: Int!
    ) {
        updateMovie(
            input: {
                _id: $_id
                title: $title
                description: $description
                published: $published
            }
        ) {
            title
            description
            published
            updatedAt
        }
    }
`

export const SEARCH_AND_SORT_MOVIE = gql`
    query movie($searchword: String!, $sortfactor: Int!){
        searchandSortMovie(input: {
            searchword: $searchword
            sortfactor: $sortfactor
    }){
        _id
        title
        description
    }
  }
`

/*
export const SORT_MOVIES = gql`
    query SortMovies($input: Float!) {
        sortMovies(input: $input) {
            _id
            title
            description
        }
    }
`
*/

export const DELETE_MOVIE = gql`
    mutation DeleteMovie($_id: String!) {
        deleteMovie(input: { _id: $_id })
    }
`