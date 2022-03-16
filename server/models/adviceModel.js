import mongoose from "mongoose";

const adviceSchema = new mongoose.Schema({
  body_part: {
    type: String,
    required: true,
  },

  vitamins: [
    {
    type: String,
    required: true,
    }]
  ,
});

const adviceModel = mongoose.model("advice", adviceSchema);
export default adviceModel;