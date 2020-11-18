import express from "express";
import { graphqlHTTP } from "express-graphql";
import mongoose from "mongoose";
import schema from "./schema";
import { resolvers } from "./resolvers";
import { ApolloServer, gql } from "apollo-server-express";
import cors from "cors";
// import { MongoClient } from "mongodb";

// const dbName = "test";
const dbName = "testSchema";
const password = "Rhksflwk";
const uri = `mongodb+srv://test-user-0:${password}@clusters.e1lkc.mongodb.net/${dbName}?retryWrites=true&w=majority`;
mongoose.Promise = global.Promise;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

const app = express();
const port = 4000;

// apollo Server 전
var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
// app.get("/", cors(corsOptions), (req, res) => {
//   res.json({
//     msg: "안녕",
//   });
// });
// app.use(
//   `/graphql`,
//   graphqlHTTP({
//     schema: schema,
//     graphiql: true,
//   })
// );
// app.listen(port, () => {
//   console.log(`서버 실행!! 포트는? ${port}`);
// });

const server = new ApolloServer({ schema, resolvers, cors: corsOptions });
// apollo server 후
server.applyMiddleware({
  app,
  cors: false,
  // cors: {
  //   origin: "http://localhost:3000",
  // },
});
app.listen({ port: port }, () => console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`));
