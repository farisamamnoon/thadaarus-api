import mongoose from "mongoose";

const homeworkModel = mongoose.Schema({
  subjectId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "Subjects",
  },
  description: {
    type: String,
    required: true,
  },
  class: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'Class'
  },
  date: {
    type: Date,
    required: true,
  },
  doneStudents: [
    {
      type: mongoose.Types.ObjectId,
      required: false,
      ref: "Students",
    },
  ],
});

export default mongoose.model("Homeworks", homeworkModel);
