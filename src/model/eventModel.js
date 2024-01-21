import mongoose from "mongoose";

const eventModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  participants: [
    {
      type: mongoose.Types.ObjectId,
      required: false,
      ref: "Students",
    },
  ],
  ranking: [
    {
      rank: {
        type: Number,
        required: false,
      },
      studentId: {
        type: mongoose.Types.ObjectId,
        required: false,
        ref: "Students",
      },
    },
  ],
});

export default mongoose.model("Events", eventModel);
