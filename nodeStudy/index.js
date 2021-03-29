import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import multer from 'multer'

import user from "./routes/user";
import todo from "./routes/todo";
import content from "./routes/content";
import comment from "./routes/comment";
import notice from "./routes/notice";

const app = express();
const port = 4000;

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
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

app.use("/comment", comment);

app.use("/notice", notice);


const storage = multer.diskStorage({
  destination: function(req,file,cb) {
    cb(null,'./image/')
  },
  filename : function(req, file, cb){
    //파일명 설정을 돕기 위해 요청정보(req)와 파일(file)에 대한 정보를 전달함
      var testSn = req.body.TEST_SN;
      var qSn = req.body.Q_SN;
  
      //Multer는 어떠한 파일 확장자도 추가하지 않습니다. 
      //사용자 함수는 파일 확장자를 온전히 포함한 파일명을 반환해야 합니다.        
      var mimeType;
  
      switch (file.mimetype) {
        case "image/jpeg":
          mimeType = "jpg";
        break;
        case "image/png":
          mimeType = "png";
        break;
        case "image/gif":
          mimeType = "gif";
        break;
        case "image/bmp":
          mimeType = "bmp";
        break;
        default:
          mimeType = "jpg";
        break;
      }
  
      cb(null, testSn + "_" + qSn + "." + mimeType);
    }
})
const upload = multer({storage: storage});;


app.post('/upload', upload.array('IMG_FILE'), function (req, res) {
  
  var imgFileArr = req.files; //파일 객체를 배열 형태로 리턴함.
  //var imgFile = req.file; //파일이 1개인 경우(upload.single()을 이용한 경우)
  console.log(req)
  res.json({
    msg: 1
  });
});

app.post("/arrTest", (req, res) => {
  console.log(req.body);
  res.json({
    msg: req.body,
  });
});

app.listen(port, () => {
  console.log(`서버 실행!! 포트는? ${port}`);
});
