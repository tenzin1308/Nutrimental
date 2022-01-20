import express from "express";
import expressAsyncHandler from "express-async-handler";
import dailyIntakeModel from "../models/dailyIntakeModel.js";

const dailyIntakeRouter = express.Router();

dailyIntakeRouter.get(
  "/get/",
  expressAsyncHandler(async (req, res, err) => {
    // Some Code in here
    const item_type = await dailyIntakeModel.find({});
    return res.send('item_type');
  })
);

export default dailyIntakeRouter;
