import User from "./models/user";
import Todo from "./models/todo";

export const resolvers = {
  Query: {
    async allUser() {
      return await User.find();
    },
    async getUser(root, { _id }) {
      return await User.findById(_id);
    }, // new
    async allTodo() {
      return await Todo.find();
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
    async createTodo(root, { input }) {
      return await Todo.create(input);
    },
  },
};
