import mongoose from "mongoose";

const examModel = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  class: {
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
      subject: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "Subject",
      },
    },
  ],
});

export default mongoose.model("Exams", examModel);
