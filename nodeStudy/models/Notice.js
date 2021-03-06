import mongoose from "mongoose";
import autoIncrement from "mongoose-auto-increment";
import {dateMoment} from '../utils/utilsFunction'

const Schema = mongoose.Schema;

autoIncrement.initialize(mongoose.connection);

const NoticeSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  notice_no: {
    type: Number,
    index: true,
    unique: true,
    required: true,
  },
  registered: {
    type: String,
    default: dateMoment,
  },
});
NoticeSchema.plugin(autoIncrement.plugin, {
  model: "boardModel",
  field: "notice_no",
  startAt: 1,
  increment: 1,
});

// NoticeSchema.statics.findByToken = function (token) {
//   let user = this;
//   return jwt.verify(token, "secretToken", function (err, decoded) {
//     return user.findOne({ _id: decoded }, (err, usr) => {
//       if (err) throw err;
//       return usr;
//     });
//   });
// };

export default mongoose.model("notice", NoticeSchema);
