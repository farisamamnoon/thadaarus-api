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
  age: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    required: false,
  },
  class: {
    type: mongoose.Types.ObjectId,
    required: false,
    ref: "Class",
  },
  subjects: [
    {
      subjectId: {
        type: mongoose.Types.ObjectId,
        required: false,
        ref: "Subjects",
      },
      classId: {
        type: mongoose.Types.ObjectId,
        required: false,
        ref: "Class",
      },
    },
  ],
});

export default mongoose.model("Teachers", teacherSchema);
