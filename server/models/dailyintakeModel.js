import mongoose from "mongoose";

const dailyIntakeSchema = new mongoose.Schema({
  vitamin_name: {
    type: String,
    required: true,
  },
  recommended_amount: [
    {
      age_group: {
        type: String,
        required: true,
      },
      amount: {
        type: String,
        required: true,
      },
    },
  ],

  upper_tolerable_limit: [
    {
      age_group: {
        type: String,
        required: true,
      },
      amount: {
        type: String,
        required: true,
      },
    },
  ],
});

const dailyIntakeModel = mongoose.model("dailyintakes", dailyIntakeSchema);
export default dailyIntakeModel;
