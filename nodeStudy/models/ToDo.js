import mongoose from "mongoose";
import autoIncrement from "mongoose-auto-increment";

const Schema = mongoose.Schema;

autoIncrement.initialize(mongoose.connection);

const TodoSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  check: {
    type: Boolean,
  },
  id: {
    type: Number,
    index: true,
    unique: true,
    required: true,
  },
});
TodoSchema.plugin(autoIncrement.plugin, {
  model: "boardModel",
  field: "id",
  startAt: 1,
  increment: 1,
});

export default mongoose.model("testTodo", TodoSchema);
