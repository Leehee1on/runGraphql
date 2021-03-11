import mongoose from "mongoose";
import autoIncrement from "mongoose-auto-increment";

const Schema = mongoose.Schema;

autoIncrement.initialize(mongoose.connection);

const CommentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  comment_no: {
    type: Number,
    index: true,
    unique: true,
    required: true,
  },
  content_no: {
    type: Number,
  },
  registered: {
    type: String,
  },
});
CommentSchema.plugin(autoIncrement.plugin, {
  model: "boardModel",
  field: "comment_no",
  startAt: 1,
  increment: 1,
});

export default mongoose.model("comment", CommentSchema);
