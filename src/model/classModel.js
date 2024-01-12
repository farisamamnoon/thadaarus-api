import mongoose from "mongoose";

const classModel = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  batchStart: {
    type: Number,
    required: true,
  },
  batchEnd: {
    type: Number,
    required: true,
  },
  teacher: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "teacherModel"
  },
  subjects: [
    {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "subjectModel",
    },
  ],
  studentsId: [
    {
      studentsId: {
        type: mongoose.Types.ObjectId,
        required: false,
        ref: "studentsModel",
      },
    },
  ],
});

export default mongoose.model("Class", classModel);
