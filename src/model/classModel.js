import mongoose from "mongoose";

const classModel = mongoose.Schema({
  className: {
    type: String,
    required: true,
  },
  division: {
    type: String,
    required: false,
  },
  fees: {
    type: Number,
    required: true,
  },
  // just year might be enough
  batch: {
    type: Number,
    required: true,
  },
  subjects: [
    {
      type: String,
      required: true,
    },
  ],
  studentsId: [
    {
      type: mongoose.Types.ObjectId,
      required: false,
      ref: "Students",
    },
  ],
});

export default mongoose.model("Class", classModel);
