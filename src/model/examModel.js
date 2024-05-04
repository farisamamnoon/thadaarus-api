import mongoose, { mongo } from "mongoose";

const examModel = mongoose.Schema(
  {
    examName: {
      type: String,
      required: true,
    },
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
    exams: [
      {
        date: {
          type: Date,
          required: true,
        },
        subjectId: {
          type: mongoose.Types.ObjectId,
          required: true,
          ref: "subjects",
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Exams", examModel);
