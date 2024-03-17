import mongoose from "mongoose";

const categoryModel = new mongoose.Schema({
  name: { type: String, required: true },
  fromDate: { type: Date, required: true },
  toDate: { type: Date, required: true },
});

export default mongoose.model("Categories", categoryModel);
