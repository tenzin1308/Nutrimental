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
  dob: {
    type: String,
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
    type: String,
    required: true,
  },
});

const userModel = mongoose.model("users", userSchemaModel);
export default userModel;
