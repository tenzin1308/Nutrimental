import express from "express";
import expressAsyncHandler from "express-async-handler";
import vitaminModel from "../models/vitaminModel";

const vitaminRouter = express.Router();

vitaminRouter.get(
  "/get/vitamin/",
  expressAsyncHandler(async (req, res, err) => {
    // Some Code in here
    const item = await vitaminModel.find({});
    if (item) {
      return res.send(item);
    }
    return res.status(404).send(err.stack);
  })
);

export default vitaminRouter;
