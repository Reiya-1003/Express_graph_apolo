const graphql = require("graphql");
const Movie = require("../models/movie");
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema } = graphql;
const MovieType = new GraphQLObjectType({
  name: "Movie",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    movie: {
      type: MovieType,
      args: { id: { type: GraphQLString } },
      resolve(parents, args) {
        return Movie.findById(args.id);
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    type: MovieType,
    arge: {
      name: { type: GraphQLString },
      genre: { type: GraphQLString },
    },
    resilve(parent, args) {
      let movie = new Movie({
        name: args.name,
        genre: args.genre,
      });
    },
  },
});
module.exports = new GraphQLSchema({
  query: RootQuery,
});
