import mongoose from "mongoose";

const addcourseSchema = new mongoose.Schema({
  course: {
    type: String,
    required: true,
    trim: true
  },
  subject: {
    type: String,
    required: true,
    trim: true
  },
  grade: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: Number,
    default: 1   // 1 = active, 0 = inactive
  }
}, { timestamps: true });

const addcourseSchemaModel = mongoose.model(
  "addcourse_collection",
  addcourseSchema
);

export default addcourseSchemaModel;
