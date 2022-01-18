import express from "express";
import expressAsyncHandler from "express-async-handler";
import dailyIntakeModel from "../models/dailyintakeModel";

const dailyIntakeRouter = express.Router();

dailyIntakeRouter.get(
  "/get/daily-intake",
  expressAsyncHandler(async (req, res, err) => {
    // Some Code in here
    const item_type = await dailyIntakeModel.find({});
    if (item_type) {
      return res.send(item_type);
    }
    return res.status(404).send(err.stack);
  })
);

export default dailyIntakeRouter;
