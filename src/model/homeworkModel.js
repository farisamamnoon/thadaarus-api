import mongoose from "mongoose";

const homeworkModel = mongoose.Schema({
  subjectId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "subjectModels",
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  doneStudents: [
    {
      type: mongoose.Types.ObjectId,
      required: false,
      ref: "studentsModel",
    },
  ],
});

export default mongoose.model("Homework", homeworkModel);

