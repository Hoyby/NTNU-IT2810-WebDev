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

export const SORT_MOVIES = gql`
    query SortMovies($input: Float!) {
        sortMovies(input: $input) {
            _id
            title
            description
        }
    }
`
export const DELETE_MOVIE = gql`
    mutation DeleteMovie($_id: String!) {
        deleteMovie(input: { _id: $_id })
    }
`
