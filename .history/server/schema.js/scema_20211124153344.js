const graphql = require("graphql");
const Movie = require("../models/movie");
const { GraphQLObjectType, GraphQLID, GraphQLString } = graphql;
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
        return Movie.findByID(args.id);
      },
    },
  },
});

moduls.exports = new GraphQLSchema({
  query: RootQuery,
});
