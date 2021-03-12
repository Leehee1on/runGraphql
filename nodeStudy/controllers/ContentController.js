import Content from "../models/Content";
import Comment from "../models/Comment";
import User from "../models/User";
import { totalPage, slideArr, getCurrentDate } from "../utils/utilsFunction";

let contentController = {};

contentController.register = (req, res) => {
  let token = req.cookies.x_auth;
  // 토큰 검사
  User.findByToken(token)
    .then((user) => {
      if (!user) return res.json({ isAuth: false, success: false });
      req.token = token;
      // 토큰 검증 후 글 올리기
      Content.find({}, (err, contents) => {
        const content = new Content({
          ...req.body,
          name: user.name,
          registered: getCurrentDate(),
          auth_no: user.auth_no,
        });
        content.save((err) => {
          if (err) return res.json({ success: false, err });
          return res.status(200).json({
            success: true,
            message: null,
            data: null,
          });
        });
      });
    })
    .catch((err) => {
      throw err;
    });
};

// // 안자르고 직접 자르는 api
contentController.list = (req, res) => {
  const listLength = req.body.listLength;
  const index = req.body.index;
  Content.find({}, (err, content) => {
    if (err) throw err;
    return res.status(200).json({
      success: true,
      data: {
        list: slideArr(content, listLength, index),
        total: totalPage(content.length, listLength),
        length: content.length,
      },
    });
  });
};

// 에초에 잘라서 주는 api // app에 적합
contentController.perList = (req, res) => {
  const listLength = Number(req.body.listLength || 10);
  const index = Number(req.body.index);
  const search = new RegExp(req.body.content.toLowerCase());
  Content.find({  }, {}, { limit: listLength, skip: (index - 1) * listLength }, (err, content) => {
    if (err) throw err;
    return res.status(200).json({
      success: true,
      data: content,
    });
  });
};
// total page api
contentController.totalPage = (req, res) => {
  const listLength = req.body.listLength;
  Content.count({}, (err, content) => {
    if (err) throw err;
    return res.status(200).json({
      success: true,
      data: totalPage(content, listLength),
    });
  });
};

contentController.detail = (req, res) => {
  Content.findOne({ content_no: req.params.content_no }, (err, content) => {
    if (err) throw err;
    // 댓글을 같이 줘야할 때
    // Comment.find({ content_no: req.params.content_no }, (err, comment) => {
    //   if (err) throw err;
    //   return res.status(200).json({
    //     success: true,
    //     data: {
    //       content: content,
    //       comment_list: comment,
    //     },
    //   });
    // });
    return res.status(200).json({
      success: true,
      data: content,
    });
  });
};

contentController.edit = (req, res) => {
  let token = req.cookies.x_auth;
  // 토큰 검사
  User.findByToken(token).then((user) => {
    if (!user) return res.json({ isAuth: false, success: false });
    // 찾기
    Content.findOne({ content_no: req.params.content_no }, (err, content) => {
      if (content === null || content === undefined)
        return res.json({
          success: false,
          message: "존재하지 않는 게시글입니다",
        });
      // 게시글의 회원번호와 토큰의 회원번호 비교
      if (content.auth_no !== user.auth_no)
        return res.json({ isAuth: false, success: false, message: "SignTokenInvalid" });
      //
      Content.findOneAndUpdate(
        { content_no: req.params.id },
        { $set: { content: req.body.content, title: req.body.title } },
        (err, content) => {
          if (err) throw err;
          return res.status(200).json({
            success: true,
            data: content,
          });
        }
      );
    });
  });
};

contentController.delete = (req, res) => {
  let token = req.cookies.x_auth;
  User.findByToken(token).then((user) => {
    if (!user) return res.json({ isAuth: false, success: false });
    //
    Content.findOne({ content_no: req.params.content_no }, (err, content) => {
      if (content === null || content === undefined)
        return res.json({
          success: false,
          message: "존재하지 않는 게시글입니다",
        });
      if (content.auth_no !== user.auth_no)
        return res.json({ isAuth: false, success: false, message: "SignTokenInvalid" });

      // DB에서 삭제
      // content.remove();
      // return res.status(200).json({
      //   success: true,
      // });
      Content.findOneAndUpdate({ content_no: req.params.content_no }, { $set: { content_status: "DEAD" } }, (err) => {
        if (err) throw err;
        Comment.find({ content_no: req.params.content_no }).updateMany(
          {},
          { $set: { comment_status: "DEAD" } },
          (err, comment) => {
            return res.status(200).json({
              success: true,
            });
          }
        );
      });
    });
  });
};

module.exports = contentController;
