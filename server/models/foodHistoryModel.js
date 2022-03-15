import mongoose from "mongoose";

const foodHistorySchema = new mongoose.Schema({
  user_email: {
    type: String,
    requried: true,
  },
  history: [
    {
      food_name: {
        type: String,
        requried: true,
        default: "",
      },
      calories: {
        type: String,
        required: true,
        default: "",
      },
      amount: {
        type: String,
        required: true,
        default: "",
      },
      date: {
        type: Date,
        default: Date,
        required: true,
      },
      nutrients: [
        {
          nutrient_name: {
            type: String,
            required: true,
            default: "",
          },
          nutrient_quantity: {
            type: String,
            default: "",
            requried: true,
          },
        },
      ],
    },
  ],
});

const foodHistoryModel = mongoose.model("foodhistories", foodHistorySchema);
export default foodHistoryModel;
