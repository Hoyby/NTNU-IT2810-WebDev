import gql from 'graphql-tag'

export const GET_MOVIES = gql`
    query GetMovies {
        getmovies {
            _id
            title
            description
            published
            createdAt
            updatedAt
        }
    }
`

// export const GET_MOVIE_BY_ID = gql`
// 	query findMovie($_id: String!){
// 		_id
// 		title
// 		description
// 		published
// 		createdAt
// 		updatedAt
// 	}
// `;

// export const CREATE_MOVIE = gql`
// 	mutation createMovie($title: String!, $description: String!, $published: Integer!){
// 		createMovie(input:{title: $title,
// 					description: $description,
// 					published: $published}){

// 				title
// 				published
// 				description
// 				createdAt
// 				updatedAt

// 			}
// 	}
// `;

// export const UPDATE_MOVIE = gql`
// 	mutation updateMovie($title: String?, $description: String?, $published: Integer?){
// 		createMovie(input:{title?: $title,
// 					description?: $description,
// 					published?: $published}){

// 				title
// 				published
// 				description
// 				createdAt
// 				updatedAt

// 			}
// 	}
// 	`;

// export const DELETE_MOVIE = gql`
// 	mutation deleteMovie($_id: String!}){
// 		deleteMovie(input:{_id: $_id})
// 	}
// `;


export const SEARCH = gql`
    query search($input: String!){
        searchMovie(input: $input){
            _id
            title
            published
        }
  }
`

export const SORT = gql`
    query sort($input: Float!){
        sortMovie(input: $input){
        _id
        title
        description
        }
    }
`