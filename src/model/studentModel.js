import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  class: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: classModel,
  },
  phone: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  attendance: [
    {
      date: {
        type: Date,
        required: true,
      },
      isPresent: {
        type: Boolean,
        required: true,
      },
    },
  ],
  exams: [
    {
      examId: {
        type: mongoose.Types.ObjectId,
        required: false,
        ref: "examModel",
      },
      mark: {
        type: Number,
        required: false,
      },
    },
  ],
  fees: [
    {
      date: {
        type: Date,
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
      discounted: {
        type: Number,
        required: true,
      },
    },
  ],
});

export default mongoose.model("Students", studentSchema);
