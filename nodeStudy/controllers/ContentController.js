import Content from "../models/Content";
import User from "../models/User";
import { totalPage, slideArr, getCurrentDate } from "../utils/utilsFunction";

let contentController = {};

contentController.register = (req, res) => {
  let token = req.cookies.x_auth;
  User.findByToken(token)
    .then((user) => {
      if (!user) return res.json({ isAuth: false, success: false });
      req.token = token;
      // req.user = user;
      Content.find({}, (err, contents) => {
        const content = new Content({ ...req.body, name: user.name, registered: getCurrentDate() });
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
  const listLength = Number(req.body.listLength);
  const index = Number(req.body.index);
  const search = new RegExp(req.body.content.toLowerCase());
  Content.find({ content: search }, {}, { limit: listLength, skip: (index - 1) * listLength }, (err, content) => {
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
    console.log(content);
    return res.status(200).json({
      success: true,
      data: totalPage(content, listLength),
    });
  });
};

// contentController.delete = (req, res) => {
//   return Content.findOneAndDelete({ _id: req.params._id }, (err) => {
//     if (err) throw err;
//     return res.status(200).json({
//       success: true,
//     });
//   });
// };

// contentController.edit = (req, res) => {
//   console.log(req.body);
//   Todo.findOne({ id: req.params.id }, (err, content) => {
//     return Content.findOneAndUpdate({ id: req.params.id }, { $set: { content: req.body.content } }, (err, content) => {
//       if (err) throw err;
//       return res.status(200).json({
//         success: true,
//         data: content,
//       });
//     });
//   });
// };

module.exports = contentController;
