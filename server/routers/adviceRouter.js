import express from "express";
import expressAsyncHandler from "express-async-handler";
import adviceModel from "../models/adviceModel.js";

const adviceRouter = express.Router();

adviceRouter.get(
  "/get/",
  expressAsyncHandler(async (req, res, err) => {
    // Some Code in here
    const advice = await adviceModel.find({
      body_part: { $regex: req.query.search, $options: "i" },
    });
    if (advice) {
      return res.status(200).send(advice);
    }
    return res.status(404).send(err.stack);
  })
);

export default adviceRouter;
