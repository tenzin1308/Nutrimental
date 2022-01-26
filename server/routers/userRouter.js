import express from "express";
import expressAsyncHandler from "express-async-handler";
import userModel from "../models/userModel.js";

const userRouter = express.Router();

userRouter.get(
  "/get/",
  expressAsyncHandler(async (req, res, err) => {
    // Some Code in here
    try {
      await userModel.find({ user_email: req.body.user_email }, function (err, doc) {
        if (err) {
          console.log(err);
          res.send(err);
        } else {
          res.status(200).send(doc);
        }
      });
      
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  })
);

userRouter.post(
  "/post/",
  expressAsyncHandler(async (req, res, err) => {

    // Some Code in here
    try {
      if (await userModel.exists({ user_email: req.body.user_email })) {
        return res.status(400).send("user already exist");
      }
      else {
        const newUser = userModel(req.body);
        newUser.save();
      }
    } catch (err) {
      console.log(err);
      return res.status(400).send(err);
    }
    return res.status(200).send("A Ok");
  })
);

userRouter.put(
  "/put/",
  expressAsyncHandler(async (req, res, err) => {

    // Some Code in here
    try {
      await userModel.findOneAndUpdate(
        { user_email: req.body.user_email },
        req.body,
        {
          new: true,
          upsert: true,
        }
      );
    } catch (err) {
      console.log(err);
      return res.status(400).send(err);
    }
    return res.status(200).send("A Ok");
  })
);

export default userRouter;
