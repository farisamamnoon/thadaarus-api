import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema(
  {
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
    // subjects: [
    //   {
    //     subjectId: {
    //       // type: mongoose.Types.ObjectId,
    //       // required: false,
    //       // ref: "Subjects",
    //       type: String,
    //       required: false
    //     },
    //     classId: {
    //       type: mongoose.Types.ObjectId,
    //       required: false,
    //       ref: "Class",
    //       // type: String,
    //       // required: false
    //     },
    //   },
    // ],
  },
  { timestamps: true }
);

export default mongoose.model("Teachers", teacherSchema);
