import mongoose from "mongoose";

const batchModal = new mongoose.Schema(
  {
    name: { type: String, required: true },
    classes: [
      {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "class",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("batches", batchModal);
