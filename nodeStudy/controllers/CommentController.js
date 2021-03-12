import Comment from "../models/Comment";
import Content from "../models/Content";
import User from "../models/User";
import { totalPage, slideArr, getCurrentDate } from "../utils/utilsFunction";

let commentController = {};

commentController.register = (req, res) => {
  let token = req.cookies.x_auth;
  // 토큰 검사
  User.findByToken(token)
    .then((user) => {
      if (!user) return res.json({ isAuth: false, success: false });
      req.token = token;
      // 토큰 검증 후 글 올리기
      Comment.find({}, (err) => {
        const comment = new Comment({
          ...req.body,
          name: user.name,
          registered: getCurrentDate(),
          auth_no: user.auth_no,
        });
        comment.save((err) => {
          if (err) return res.json({ success: false, err });
          Content.findOne({ content_no: req.body.content_no }, (err, content) => {
            Content.findOneAndUpdate(
              { content_no: req.body.content_no },
              { $set: { comment_count: content.comment_count + 1 } },
              (err) => {
                return res.status(200).json({
                  success: true,
                  message: null,
                  data: null,
                });
              }
            );
          });
        });
      });
    })
    .catch((err) => {
      throw err;
    });
};

// // 안자르고 직접 자르는 api
commentController.list = (req, res) => {
  const listLength = req.body.listLength;
  const index = req.body.index;
  Comment.find({ content_no: req.body.content_no }, (err, comment) => {
    if (err) throw err;
    return res.status(200).json({
      success: true,
      data: {
        list: slideArr(comment, listLength, index),
        total: totalPage(comment.length, listLength),
        length: comment.length,
      },
    });
  });
};

// 에초에 잘라서 주는 api // app에 적합
commentController.perList = (req, res) => {
  const listLength = Number(req.body.listLength);
  const index = Number(req.body.index);
  const search = new RegExp(req.body.comment.toLowerCase() );
  Comment.find(
    { comment: search, content_no: req.body.content_no },
    {},
    { limit: listLength, skip: (index - 1) * listLength },
    (err) => {
      if (err) throw err;
      return res.status(200).json({
        success: true,
        data: comment,
      });
    }
  );
};
// total page api
commentController.totalPage = (req, res) => {
  const listLength = req.body.listLength;
  Comment.count({ content_no: req.body.content_no }, (err) => {
    if (err) throw err;
    return res.status(200).json({
      success: true,
      data: totalPage(comment, listLength),
    });
  });
};

commentController.edit = (req, res) => {
  let token = req.cookies.x_auth;
  // 토큰 검사
  User.findByToken(token).then((user) => {
    if (!user) return res.json({ isAuth: false, success: false });
    // 찾기
    Comment.findOne({ comment_no: req.params.comment_no }, (err, comment) => {
      if (comment === null || comment === undefined)
        return res.json({
          success: false,
          message: "존재하지 않는 댓글입니다",
        });
      // 게시글의 회원번호와 토큰의 회원번호 비교
      if (comment.auth_no !== user.auth_no)
        return res.json({ isAuth: false, success: false, message: "SignTokenInvalid" });
      //
      Comment.findOneAndUpdate(
        { comment_no: req.params.comment_no },
        { $set: { comment: req.body.comment } },
        (err, comment) => {
          if (err) throw err;
          return res.status(200).json({
            success: true,
            data: comment,
          });
        }
      );
    });
  });
};

commentController.delete = (req, res) => {
  let token = req.cookies.x_auth;
  User.findByToken(token).then((user) => {
    if (!user) return res.json({ isAuth: false, success: false });
    //
    Comment.findOne({ comment_no: req.params.comment_no }, (err, comment) => {
      if (comment === null || comment === undefined)
        return res.json({
          success: false,
          message: "존재하지 않는 댓글입니다",
        });
      if (comment.auth_no !== user.auth_no)
        return res.json({ isAuth: false, success: false, message: "SignTokenInvalid" });

      // comment.remove();
      // return res.status(200).json({
      //   success: true,
      // });
      Content.findOne({ content_no: req.body.content_no }, (err, content) => {
        Content.findOneAndUpdate(
          { content_no: req.body.content_no },
          { $set: { comment_count: content.comment_count - 1 } },
          (err) => {
            if (comment.comment_status === "DEAD")
              return res.json({
                success: false,
                message: "이미 삭제된 댓글입니다",
              });
            Comment.findOneAndUpdate(
              { comment_no: req.params.comment_no },
              { $set: { comment_status: "DEAD" } },
              (err) => {
                if (err) throw err;
                return res.status(200).json({
                  success: true,
                  message: null,
                  data: null,
                });
              }
            );
          }
        );
      });
    });
  });
};

module.exports = commentController;
