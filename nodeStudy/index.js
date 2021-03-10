import express from "express";
import mongoose from "mongoose";
// import User from "./models/User";
import bodyParser from "body-parser";
import cors from "cors";
import user from "./routes/user";
import todo from "./routes/todo";

const app = express();
const port = 4000;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

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

// app.post("/register", (req, res) => {
//   // 회원가입 할때 필요한 정보들을 client에서 가져오면
//   // 그것들을 데이터 베이스에 넣어준다
//   const user = new User(req.body.body);

//   user.save((err, userInfo) => {
//     if (err) return res.json({ success: false, err });
//     return res.status(200).json({
//       success: true,
//       message: null,
//       data: null,
//     });
//   });
// });

// app.get("/list", (req, res) => {
//   User.find({}, (err, usr) => {
//     if (err) throw err;
//     return res.status(200).json({
//       success: true,
//       data: usr,
//     });
//   });
// });

// app.post("/getUsr", (req, res) => {
//   return User.findOne({ _id: req.body.body }, (err, usr) => {
//     if (err) throw err;
//     return res.status(200).json({
//       success: true,
//       data: usr,
//     });
//   });
// });

// app.post("/searchUser", (req, res) => {
//   const search = new RegExp(req.body.name.toLowerCase());

//   return User.find({ name: search }, (err, usr) => {
//     if (err) throw err;
//     return res.status(200).json({
//       success: true,
//       data: usr,
//     });
//   });
// });
// app.delete("/deleteUsr/:id", (req, res) => {
//   return User.findByIdAndDelete({ _id: req.params.id }, (err, usr) => {
//     if (err) throw err;
//     return res.status(200).json({
//       success: true,
//     });
//   });
// });

app.listen(port, () => {
  console.log(`서버 실행!! 포트는? ${port}`);
});
