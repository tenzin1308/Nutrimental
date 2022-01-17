import mongoose from "mongoose";

const dailyintakeSchema = new mongoose.Schema({
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

const dailyintake = mongoose.model("dailyIntake", dailyintakeSchema);
export default dailyintake;
