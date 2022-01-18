import Cryptr from "cryptr";
import express from "express";
import expressAsyncHandler from "express-async-handler";
import userModel from "../models/userModel.js";

const userRouter = express.Router();
const cryptr = new Cryptr("SomethingSecretKeyAAA");

userRouter.get(
  "/get/user/",
  expressAsyncHandler(async (req, res, err) => {
    // Some Code in here
    const users_email = await userModel.find({
      user_email: req.body.user_email,
    });
    if (users_email) {
      return res.send(users_email);
    }
    return res.status(404).send(err.stack);
  })
);

userRouter.post(
  "/post/user",
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
      return res.send(err);
    }
    return res.send("A Ok");
  })
);

export default userRouter;
