import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  class: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "Class",
  },
  dob: {
    type: Date,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  group: {
    type: String,
    required: true,
  },
  prevMadrasa: {
    type: String,
    required: false,
  },
  prevClass: {
    type: Number,
    required: false,
  },
  remarks: {
    type: String,
    required: false,
  },
  // match student class with exam class and view subject names(/exam/marks/add)
  marks: [
    {
      examName: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "Exams",
      },
      marks: [
        {
          subject: {
            type: String,
            required: false,
          },
          mark: {
            type: Number,
            required: false,
          },
        },
      ],
    },
  ],
  fees: [
    {
      date: {
        type: Date,
        required: true,
      },
      amount: {
        type: Number,
        required: false,
      },
      discount: {
        type: Number,
        required: false,
      },
    },
  ],
});

export default mongoose.model("Students", studentSchema);
