import express from "express";
import expressAsyncHandler from "express-async-handler";
import vitaminModel from "../models/vitaminModel.js";

const vitaminRouter = express.Router();

vitaminRouter.get(
  "/get/",
  expressAsyncHandler(async (req, res, err) => {
    // Some Code in here
    const vitamin = await vitaminModel.find({
      vitamin_name: { $regex: req.body.vitamin_name, $options: "i" },
    });
    if (vitamin) {
      return res.status(200).send(vitamin);
    }
    return res.status(404).send(err.stack);
  })
);

export default vitaminRouter;
