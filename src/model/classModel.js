import mongoose from "mongoose";

const classModel = mongoose.Schema({
  standard: {
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
  batchStart: {
    type: Number,
    required: true,
  },
  batchEnd: {
    type: Number,
    required: true,
  },
  teacher: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "Teachers",
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
