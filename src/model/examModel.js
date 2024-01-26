import mongoose from "mongoose";

const examModel = mongoose.Schema({
  examName: {
    type: String,
    required: true,
  },
  classId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "Class",
  },
  exams: [
    {
      date: {
        type: Date,
        required: true,
      },
      subjectId: {
        type: String,
        required: true,
      },
    },
  ],
});

export default mongoose.model("Exams", examModel);
