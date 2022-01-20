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
      },
      calories: {
        type: String,
        required: true,
      },
      amount: {
        type: String,
        required: true,
      },
      date: {
        type: String,
        required: true,
      },
      nutrients: [
        {
          nutrient_name: {
            type: String,
            required: true,
          },
          nutrient_quantity: {
            type: String,
            requried: true,
          },
        },
      ],
    },
  ],
});

const foodHistoryModel = mongoose.model("foodhistories", foodHistorySchema);
export default foodHistoryModel;
