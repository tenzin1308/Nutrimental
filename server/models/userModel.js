import mongoose from "mongoose";

const userSchemaModel = new mongoose.Schema({
  user_email: {
    type: String,
    required: true,
    unique: true,
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
  gender: {
    type: String,
    enum: ["male", "female"],
  },
  diet: {
    type: String,
    required: false,
  },
  signup_date: {
    type: Date,
    default: Date,
    required: true,
  },
  isdietitian: {
    type: Boolean,
    default: false,
    required: true,
  },
  image_url: {
    type: String,
    required: false,
  },
   // dietitan's customer list
   whoUser: [
    {
      type: String,
      default: false,
    },
  ],
  // choosing your dietitian
  whoDietitian: {
    type: String,
    default: false,
  },
});

const userModel = mongoose.model("users", userSchemaModel);
export default userModel;
