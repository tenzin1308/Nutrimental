import mongoose from "mongoose";

const userSchemaModel = new mongoose.Schema({
  user_email: {
    type: String,
    required: true,
    unique: true,
  },
  user_name: {
    type: String,
    required: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  weight: {
    type: String,
    required: true,
  },
  height: {
    type: String,
    required: true,
  },
  diet: {
    type: String,
    required: true,
  },
  signup_date: {
    type: Date,
    default: Date,
    required: true,
  },
});

const userModel = mongoose.model("users", userSchemaModel);
export default userModel;
