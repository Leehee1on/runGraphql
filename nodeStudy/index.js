import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";

import user from "./routes/user";
import todo from "./routes/todo";
import content from "./routes/content";

const app = express();
const port = 4000;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(cookieParser());
// const dbName = "testSchema";
const dbName = "20210309";
const password = "Rhksflwk";

const uri = `mongodb+srv://test-user-0:${password}@clusters.e1lkc.mongodb.net/${dbName}?retryWrites=true&w=majority`;
mongoose.Promise = global.Promise;
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(() => console.log("MongoDB Connected..."));

app.get("/", (req, res) => {
  res.json({
    msg: "안녕",
  });
});

app.use("/user", user);

app.use("/todo", todo);

app.use("/content", content);

app.listen(port, () => {
  console.log(`서버 실행!! 포트는? ${port}`);
});
