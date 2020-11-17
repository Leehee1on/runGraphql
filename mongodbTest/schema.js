import { makeExecutableSchema } from "graphql-tools";
import { resolvers } from "./resolvers"; // resolvers.js 파일 생성

const typeDefs = `
    type User {
        _id: ID!
        name: String!
        age: Int!
        gender: String!
    }
    type Todo {
        _id: ID!
        title: String!
    }
    type Query {
        allUser: [User]
        getUser(_id: ID!): User
        allTodo: [Todo]

    }

   input TodoInput {
      title: String!
    }

   input UserInput {
      name: String!
      age: Int!
      gender: String!
    }

    type Mutation {
      createUser(input: UserInput): User
      updateUser(_id: ID!, input: UserInput): User
      deleteUser(_id: ID!): User
      createTodo(input: TodoInput): Todo
  }
`;

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;
