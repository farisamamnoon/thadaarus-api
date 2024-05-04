import mongoose from "mongoose";

const subjectModel = mongoose.Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("subjects", subjectModel);
