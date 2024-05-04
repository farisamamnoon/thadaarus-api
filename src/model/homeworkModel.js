import mongoose from "mongoose";

const homeworkModel = mongoose.Schema(
  {
    classId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Class",
    },
    batchId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "batches",
    },
    subjectId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "subjects",
    },
    date: {
      type: Date,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    students: [
      {
        type: mongoose.Types.ObjectId,
        required: false,
        ref: "Students",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Homeworks", homeworkModel);
