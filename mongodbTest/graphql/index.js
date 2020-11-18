import express from "express";
import mongoose from "mongoose";
import resolver from "./resolver";
import { GraphQLServer } from "graphql-yoga";

// const dbName = "test";
const dbName = "testSchema";
const password = "Rhksflwk";
const uri = `mongodb+srv://test-user-0:${password}@clusters.e1lkc.mongodb.net/${dbName}?retryWrites=true&w=majority`;
mongoose.Promise = global.Promise;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

const app = express();
const port = 4000;

// graphql-yoga version
const server = new GraphQLServer({
  typeDefs: "./graphql/schema.graphql",
  resolvers: resolver,
});

server.start(() => console.log(`🚀 Server ready at http://localhost:${port} graphql-yoga`));
