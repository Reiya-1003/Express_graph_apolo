const graphql = require("graphql");
const Movie = require("../models/movie");
const Director = require("../models/director");
const Favo = require("../models/favo");
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNumber,
  GraphQLSchema,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

const FavoType = new GraphQLObjectType({
  name: "Favo",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    img: { type: GraphQLString },
    movienumber: { type: GraphQLInt },
    user:{
      type: UserType,
      resolve(parent,args){
        return UserType.findById(parent.userId);
      }
    }
  }),
});

const MovieType = new GraphQLObjectType({
  name: "Movie",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    director: {
      type: DirectorType,
      resolve(parent, args) {
        return Director.findById(parent.directorId);
      },
    },
  }),
});

const DirectorType = new GraphQLObjectType({
  name: "Director",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    movies: {
      type: new GraphQLList(MovieType),
      resolve(parent, args) {
        return Movie.find({ directorId: parent.id });
      },
    },
  }),
});

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    address: { type: GraphQLString },
    favos: {
      type: new GraphQLList(FavoType),
      resolve(parent, args) {
        return Favo.find({ userId: parent.id });
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    movie: {
      type: MovieType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Movie.findById(args.id);
      },
    },
    director: {
      type: DirectorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Director.findById(args.id);
      },
    },
    favo: {
      type: FavoType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Favo.findById(args.id);
      },
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return User.findById(args.id);
      },
    },
    movies: {
      type: new GraphQLList(MovieType),
      resolve(parent, args) {
        return Movie.find({});
      },
    },
    directors: {
      type: new GraphQLList(DirectorType),
      resolve(parent, args) {
        return Director.find({});
      },
    },
    favos: {
      type: new GraphQLList(FavoType),
      resolve(parent, args) {
        return Favo.find({});
      },
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return User.find({});
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addMovie: {
      type: MovieType,
      args: {
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        directorId: { type: GraphQLID },
      },
      resolve(parent, args) {
        let movie = new Movie({
          name: args.name,
          genre: args.genre,
          directorId: args.directorId,
        });

        return movie.save();
      },
    },
    addDirector: {
      type: DirectorType,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
      },
      resolve(parent, args) {
        let director = new Director({
          name: args.name,
          age: args.age,
        });

        return director.save();
      },
    },
    addFavo: {
      type: FavoType,
      args: {
        title: { type: GraphQLString },
        img: { type: GraphQLString },
        movienumber: { type: GraphQLInt },
        userId: { type: GraphQLID },
      },
      resolve(parent, args) {
        let favo = new Favo({
          title: args.title,
          img: args.img,
          movienumber: args.movienumber,
          userId: args.userId,
        });
        return favo.save();
      },
    },
    addUser: {
      type: UserType,
      args: {
        name: { type: GraphQLString },
        address: { type: GraphQLString },
      },
      resolve(parent, args) {
        let user = new User({
          name: args.name,
          address: args.address,
        });

        return user.save();
      },
    },
    updateMovie: {
      type: MovieType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        directerId: { type: GraphQLInt },
      },
      resolve(parent, args) {
        let updateMovie = {};
        args.name && (updateMovie.name = args.name);
        args.genre && (updateMovie.genre = args.genre);
        args.directerId && (updateMovie.directerId = args.directerId);
        return Movie.findByIdAndUpdate(args.id, updateMovie, {
          new: true,
        });
      },
    },
    updateDirector: {
      type: DirectorType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
      },
      resolve(parent, args) {
        let updateDirector = {};
        args.name && (updateDirector.name = args.name);
        args.ags && (updateDirector.ags = args.ags);
        return Director.findByIdAndUpdate(args.id, updateDirector, {
          new: true,
        });
      },
    },
    deleteMovie: {
      type: MovieType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Movie.findByIdAndRemove(args.id);
      },
    },
    deleteFavo: {
      type: FavoType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Favo.findByIdAndDelete(args.id);
      },
    },
    deleteDirector: {
      type: DirectorType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Director.findByIdAndRemove(args.id);
      },
    },
  },
});
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
