import User from "../models/User";

const resolver = {
  // Query: {
  //   movies: (_, { limit, rating }) => getMovies(limit, rating),
  //   movie: (_, { id }) => getMovie(id),
  //   suggestions: (_, { id }) => getSuggestions(id),
  // },
  Query: {
    allUser: (_, {}) => {
      return User.find();
    },
    getUser: (_, { name }) => {
      return User.findById(name);
    },
  },
};
export default resolver;
