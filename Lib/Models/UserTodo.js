import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.models.UserTodo || mongoose.model("UserTodo", TodoSchema);
