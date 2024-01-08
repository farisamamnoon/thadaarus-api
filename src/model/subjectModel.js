import mongoose from "mongoose";

const subjectModel = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Subjects", subjectModel);