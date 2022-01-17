import mongoose from "mongoose";

const vitaminSchema = new mongoose.Schema({
  vitamin_name: {
    type: String,
    required: true,
  },
  vitamain_function: {
    type: String,
    requried: true,
  },
});

const vitamin = mongoose.model("vitamins", vitaminSchema);
export default vitamin;
