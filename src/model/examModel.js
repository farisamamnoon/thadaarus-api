import mongoose from "mongoose";

const examModel = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  subject: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
});

export default mongoose.model("Exams", examModel);
