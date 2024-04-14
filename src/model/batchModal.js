import mongoose from "mongoose";

const batchModal = new mongoose.Schema({
  name: { type: String, required: true },
  classes: [
    {
      type: mongoose.Types.ObjectId,
      required: false,
      ref: "class",
    },
  ],
});

export default mongoose.model("batches", batchModal);
