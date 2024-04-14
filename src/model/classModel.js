import mongoose from "mongoose";

const classModel = mongoose.Schema({
  className: {
    type: String,
    required: true,
  },
  subjects: [
    {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "subjects"
    },
  ],
});

export default mongoose.model("Class", classModel);
