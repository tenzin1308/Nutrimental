import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  user_email: {
    type: String,
    required: true,
  },
  user_name: {
    type: String,
    required: true,
  },
  password: {
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

const user = mongoose.model("users", userSchema);
export default user;
