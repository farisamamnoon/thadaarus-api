import mongoose from "mongoose";

const attendanceModal = mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  attendance: [
    {
      student: { type: mongoose.Types.ObjectId, required: true, ref: "students" },
      isPresent: { type: Boolean, required: true },
    },
  ],
});
