import express from "express";
import { graphqlHTTP } from "express-graphql";
import mongoose from "mongoose";
import schema from "./schema";
// import { MongoClient } from "mongodb";

// const dbName = "test";
const dbName = "testSchema";
const password = "Rhksflwk";
const uri = `mongodb+srv://test-user-0:${password}@clusters.e1lkc.mongodb.net/${dbName}?retryWrites=true&w=majority`;
mongoose.Promise = global.Promise;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// client.connect((err) => {
//   const collection = client.db("test").collection("devices"); // 컬렉션 객체에 대한 작업 수행
//   const db = client.db(dbName);
//   client.close();
// });
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.json({
    msg: "안녕",
  });
});
app.use(
  `/graphql`,
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.listen(port, () => {
  console.log(`서버 실행!! 포트는? ${port}`);
});
