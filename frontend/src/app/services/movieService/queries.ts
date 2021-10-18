import gpl from "graphql-tag"
export const GET_MOVIE_PAGE = gpl`
    query GetMoviePage($page: Int!, $perPage: Int!) {
        Page(page: $page, perPage: $perPage) {
            media {
                id
                description
                title {
                    english
                }
                coverImage {
                    medium
                }
            }
        }
    }
`