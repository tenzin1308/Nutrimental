import express from "express";
import expressAsyncHandler from "express-async-handler";
import foodHistoryModel from "../models/foodHistoryModel.js";

const foodHistoryRouter = express.Router();

foodHistoryRouter.get(
  "/get/",
  expressAsyncHandler(async (req, res, err) => {
    // Some Code in here
    return res.send('food history get methods');
    
  })
);

foodHistoryRouter.post(
  "/post/",
  expressAsyncHandler(async (req, res, err) => {
    // Some Code in here
    return res.send('food history post methods');
  })
);

export default foodHistoryRouter;
