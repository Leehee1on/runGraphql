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
    getUser: (_, { _id }) => {
      return User.findById(_id);
    },
    findUser: (_, args) => {
      return User.find(args);
    },
    test: () => {
      return User.find();
    },
  },

  Mutation: {
    async createUser(root, { input }) {
      return await User.create(input);
    },
    async updateUser(root, { _id, input }) {
      return await User.findOneAndUpdate({ _id }, input, { new: true });
    },
    async deleteUser(root, { _id, input }) {
      return await User.findOneAndDelete({ _id });
    },
  },
};
export default resolver;
