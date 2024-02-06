import mongoose from "mongoose";

const homeworkModel = mongoose.Schema({
  classId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'Class'
  },
  subjectId: {
    type: String, 
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  desc: {
    type: String,
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
