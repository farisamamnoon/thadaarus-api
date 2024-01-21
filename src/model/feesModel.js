import mongoose from "mongoose";

const feesModel = new mongoose.Schema({
  student: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  amount: [
    {
      type: Number,
      required: true,
    },
  ],
  discount: {
    type: Number,
    required: false,
  },
});

export default mongoose.model("Fees", feesModel);
