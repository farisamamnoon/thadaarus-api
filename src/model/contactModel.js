import mongoose from "mongoose";

const contactModel = mongoose.Schema({
  to: {},
  from: {},
  content: {
    type: String,
    required: true,
  },
});
