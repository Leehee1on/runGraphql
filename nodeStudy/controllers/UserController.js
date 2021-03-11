import User from "../models/User";
import bcrypt from "bcrypt";

let userController = {};

userController.register = (req, res) => {
  const user = new User(req.body);
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
      message: null,
      data: null,
    });
  });
};

userController.signIn = (req, res) => {
  // console.log(req.body);
  User.findOne({ id: req.body.id }, (err, user) => {
    if (err) throw err;
    if (!user)
      return res.json({
        success: false,
        message: "유저가 없습니다",
      });
    // bcrypt.compare(req.body.password, user.password, function (err, isMatch) {
    //   if (err) return err;
    //   console.log(isMatch);
    // });

    // if (!user.comparePassword(req.body.password)) return console.log(err);
    // user.comparePassword(req.body.password, (err, isMatch) => {
    //   if (!isMatch) return res.json({ success: false, message: "비밀번호오류" });
    // });

    if (!user.comparePassword(req.body.password)) {
      return res.json({ success: false, message: "비밀번호오류" });
    } else {
      user
        .generateToken()
        .then((user) => {
          return res.cookie("x_auth", user.token).status(200).json({
            success: true,
            userId: user._id,
            token: user.token,
          });
        })
        .catch((err) => res.status(400).send(err));
      // return res.json({ success: true });
    }
  });
};

userController.auth = (req, res) => {
  let token = req.cookies.x_auth;
  User.findByToken(token)
    .then((user) => {
      if (!user) return res.json({ isAuth: false, success: false });
      req.token = token;
      req.user = user;
      res.json(user);
    })
    .catch((err) => {
      throw err;
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
