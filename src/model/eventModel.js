import mongoose from "mongoose";

const eventModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type : Date,
    required: true
  },
  participants: [
    {
      studentsId: {
        type: mongoose.Types.ObjectId,
        required: false,
        ref: "studentsModel",
      },
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
        ref: "studentsModel"
      }
    },
  ],
});

export default mongoose.model("Events", eventModel);
