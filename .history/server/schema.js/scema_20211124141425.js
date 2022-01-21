const graphql = require("graphql");

const { GraphQLObjectType, GraphQLID, GraphQLString } = graphql;
const MovieType = new GraphQLObjectType({
  nema: "Movie",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
  }),
});
