import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  class: {
    type: mongoose.Types.ObjectId,
    required: false,
    ref: "classModel",
  },
  subjects: [
    {
      subjectId: {
        type: mongoose.Types.ObjectId,
        required: false,
        ref: "subjectModel",
      },
      classId: {
        type: mongoose.Types.ObjectId,
        required: false,
        ref: "classModel",
      }
    },
  ],
});

export default mongoose.model("Teachers", teacherSchema);
