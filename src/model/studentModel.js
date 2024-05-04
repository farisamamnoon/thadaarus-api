import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    batch: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "batches",
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
    attendance: [
      {
        date: {
          type: Date,
          required: false,
        },
        attendance: {
          type: Boolean,
          required: false,
        },
      },
    ],
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
      required: false,
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
    totalFees: {
      type: Number,
      required: true,
    },
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
  },
  { timestamps: true }
);

export default mongoose.model("Students", studentSchema);
