import mongoose from "mongoose";
import autoIncrement from "mongoose-auto-increment";
import { dateMoment } from "../utils/utilsFunction";

const Schema = mongoose.Schema;

autoIncrement.initialize(mongoose.connection);

const ContentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  content_no: {
    type: Number,
    index: true,
    unique: true,
    required: true,
  },
  registered: {
    type: String,
    default: dateMoment,
  },
  auth_no: {
    type: Number,
  },
  content_status: {
    type: String,
    default: "ALIVE",
  },
  comment_count: {
    type: Number,
    default: 0,
  },
});
ContentSchema.plugin(autoIncrement.plugin, {
  model: "boardModel",
  field: "content_no",
  startAt: 1,
  increment: 1,
});

ContentSchema.statics.findByToken = function (token) {
  let user = this;
  return jwt.verify(token, "secretToken", function (err, decoded) {
    return user.findOne({ _id: decoded }, (err, usr) => {
      if (err) throw err;
      return usr;
    });
  });
};

export default mongoose.model("content", ContentSchema);
