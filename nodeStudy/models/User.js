import mongoose from "mongoose";
import autoIncrement from "mongoose-auto-increment";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const Schema = mongoose.Schema;

autoIncrement.initialize(mongoose.connection);

const UserSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
});
UserSchema.plugin(autoIncrement.plugin, {
  model: "boardModel",
  field: "auth_no",
  startAt: 1,
  increment: 1,
});

// 저장하기 전의 동작을 할 수 있다. 비밀번호를 암호화 하여 저장.
UserSchema.pre("save", function (next) {
  let user = this;
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

// method 들을 지정하여 사용가능
// 비밀번호 확인(로그인시)
UserSchema.methods.comparePassword = function (plainPassword) {
  return bcrypt.compare(plainPassword, this.password).then((e) => {
    return e;
  });
};

// 로그인시 토큰 생성
UserSchema.methods.generateToken = function () {
  const token = jwt.sign({ _id: this._id.toHexString() }, "secretToken", { expiresIn: "1m" });
  this.token = token;
  return this.save()
    .then((user) => user)
    .catch((err) => err);
};

UserSchema.statics.findByToken = function (token) {
  let user = this;
  return jwt.verify(token, "secretToken", function (err, decoded) {
    return user.findOne({ _id: decoded }, (err, usr) => {
      if (err) throw err;
      return usr;
    });
  });
};

export default mongoose.model("user", UserSchema);
