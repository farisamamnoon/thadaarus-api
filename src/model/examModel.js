import mongoose from "mongoose";

const examModel = mongoose.Schema({
  class: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "classModel",
  },
  date: {
    type: Date,
    required: true,
  },
  subject: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "subjectModel",
  },
});

export default mongoose.model("Exams", examModel);
