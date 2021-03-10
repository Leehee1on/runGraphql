import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import todo from "./routes/todo";

const app = express();
const port = 4000;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

const dbName = "20210309";
const password = "Rhksflwk";

const uri = `mongodb+srv://test-user-0:${password}@clusters.e1lkc.mongodb.net/${dbName}?retryWrites=true&w=majority`;
mongoose.Promise = global.Promise;
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(() => console.log("MongoDB Connected..."));

app.use("/todo", todo);
app.get("/", (req, res) => {
  res.json({
    msg: "안녕",
  });
});

app.listen(port, () => {
  console.log(`서버 실행!! 포트는? ${port}`);
});

// controller 랑 router 만들기 전
// import Todo from "./models/Todo";

// app.post("/register", (req, res) => {
//   // 회원가입 할때 필요한 정보들을 client에서 가져오면
//   // 그것들을 데이터 베이스에 넣어준다

//   Todo.find({}, (err, toDo) => {
//     const todo = new Todo({ content: req.body.content, check: false });
//     todo.save((err, toDos) => {
//       if (err) return res.json({ success: false, err });
//       return res.status(200).json({
//         success: true,
//         message: null,
//         data: null,
//       });
//     });
//   });
// });

// app.get("/list", (req, res) => {
//   Todo.find({}, (err, todo) => {
//     if (err) throw err;
//     return res.status(200).json({
//       success: true,
//       data: todo,
//     });
//   });
// });

// app.delete("/deleteTodo/:_id", (req, res) => {
//   return Todo.findOneAndDelete({ _id: req.params._id }, (err, usr) => {
//     if (err) throw err;
//     return res.status(200).json({
//       success: true,
//     });
//   });
// });

// app.put("/checkTodo/:id", (req, res) => {
//   Todo.findOne({ id: req.params.id }, (err, todo) => {
//     return Todo.findOneAndUpdate({ id: req.params.id }, { $set: { check: !todo.check } }, (err, tod) => {
//       if (err) throw err;
//       return res.status(200).json({
//         success: true,
//         data: tod,
//       });
//     });
//   });
// });

// app.put("/editTodo/:id", (req, res) => {
//   Todo.findOne({ id: req.params.id }, (err, todo) => {
//     return Todo.findOneAndUpdate({ id: req.params.id }, { $set: { content: req.body.content } }, (err, tod) => {
//       if (err) throw err;
//       return res.status(200).json({
//         success: true,
//         data: tod,
//       });
//     });
//   });
// });
