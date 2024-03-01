import mongoose from "mongoose";

const classModel = mongoose.Schema({
  className: {
    type: String,
    required: true,
  },
  division: {
    type: String,
    required: false,
  },
  teacherId: {
    type: mongoose.Types.ObjectId,
    required: false,
    ref: "Teachers",
  },
  fees: {
    type: Number,
    required: true,
  },
  batch: {
    type: Number,
    required: true,
  },
  attendance: [
    {
      date: {
        type: Date,
        required: true,
      },
      attendance: [
        {
          studentId: { type: mongoose.Types.ObjectId, required: true },
          isPresent: { type: Boolean, required: true },
        },
      ],
    },
  ],
  subjects: [
    {
      type: String,
      required: true,
    },
  ],
});

export default mongoose.model("Class", classModel);
