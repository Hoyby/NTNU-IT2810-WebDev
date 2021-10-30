# JAMDb - Just Another Movie Database

This is a frontend / backend solution that allows you to search and add movies to a database.

# Frontend

Our [frontend](frontend/) is build using React with TypeScript. We use GraphQL with apollo for CRUD operations to our backend, and redux for state management. Styling is done using Tailwind and material-tailwind for premade components.

## GraphQL / Apollo

Our API related code resides in our [movieService](frontend/src/app/services/movieService) folder. Here you'll find the queries, our APIservice class and some auto-generated files generated from the scheme fetced from the server. Scripts for downloading and generating these files can be found in [package.json](frontend/package.json) as `schema:download` and `schema:generate-watch` respectively.

## Tailwind

[Material Tailwind](https://material-tailwind.com/documentation/quick-start)

TODO: write

<br/><br/>

# Database

Our database uses MongoDB, a easy to use, document-oriented database. We chose MongoDB because of the extensive documentation in the Nest docs.

<br/><br/>

# Backend

Our [Backend](backend/) is built using NestJS, a NodeJS framework build as a wrapper around ExpressJS. We chose nest because it fully supports TypeScript and provides more structure than express. It also provides an easy to use cli for developing and maintaining code.

## mongoose

Communication between our backend server and our database server is done using mongoose, a NestJS module providing a lot of quality of life functionality like generation of schemas based on decorators. This reduces boilerplate code and increases readability.

## GrapgQL / Apollo

GraphQl is implemented using a build-in Nest module. We use what the nest [documentation](https://docs.nestjs.com/graphql/quick-start) refers to as 'code first approach' where we define classes and decorators that generates the grapgQL schema.

<br/><br/>

# Testing

TODO: write
