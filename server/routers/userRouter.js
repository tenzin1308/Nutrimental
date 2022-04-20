import express from "express";
import expressAsyncHandler from "express-async-handler";
import userModel from "../models/userModel.js";

const userRouter = express.Router();

userRouter.route("/get/").get(async (req, res) => {
  const user = await userModel.findOne({
    user_email: req.query.user_email,
  });
  res.json(user);
});

userRouter.post(
  "/post/",
  expressAsyncHandler(async (req, res, err) => {
    // Some Code in here
    try {
      if (await userModel.exists({ user_email: req.body.user_email })) {
        return res.sendStatus(400).send("user already exist");
      } else {
        const newUser = userModel(req.body);
        newUser.save();
      }
    } catch (err) {
      return res.sendStatus(400).send(err);
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
        { user_email: req.query.user_email },
        req.body,
        {
          new: true,
          upsert: true,
        }
      );
    } catch (err) {
      return res.sendStatus(400).send(err);
    }
    return res.sendStatus(200).send("A Ok");
  })
);

export default userRouter;
