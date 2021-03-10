import User from "../models/User";

let userController = {};

userController.register = (req, res) => {
  const user = new User(req.body.body);
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
      message: null,
      data: null,
    });
  });
};

userController.list = (req, res) => {
  User.find({}, (err, usr) => {
    if (err) throw err;
    return res.status(200).json({
      success: true,
      data: usr,
    });
  });
};

userController.delete = (req, res) => {
  return User.findByIdAndDelete({ _id: req.params.id }, (err, usr) => {
    if (err) throw err;
    return res.status(200).json({
      success: true,
    });
  });
};

userController.detail = (req, res) => {
  return User.findOne({ _id: req.body.body }, (err, usr) => {
    if (err) throw err;
    return res.status(200).json({
      success: true,
      data: usr,
    });
  });
};

userController.search = (req, res) => {
  const search = new RegExp(req.body.name.toLowerCase());
  return User.find({ name: search }, (err, usr) => {
    if (err) throw err;
    return res.status(200).json({
      success: true,
      data: usr,
    });
  });
};

module.exports = userController;
