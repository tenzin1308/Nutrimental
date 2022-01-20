import mongoose from "mongoose";

const vitaminSchema = new mongoose.Schema({
  vitamin_name: {
    type: String,
    required: true,
  },
  function: {
    type: String,
    requried: true,
  },
  foods: [{ type: String, requried: true }],
});

const vitaminModel = mongoose.model("vitamins", vitaminSchema);
export default vitaminModel;
