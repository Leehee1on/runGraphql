import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
});

export default mongoose.model("todo", TodoSchema);
// model('테이블명' , 스키마);
