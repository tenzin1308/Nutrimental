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

userRouter.route("/get-dietitian/").get(async (req, res) => {
  try {
    const dietitian = await userModel.find({
      isdietitian: true,
    });
    return res.status(200).json(dietitian);
  } catch (err) {
    return res.status(400).send(err);
  }
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

userRouter.post(
  "/post-Dietitian",
  expressAsyncHandler(async (req, res, err) => {
    // Removing user's email from his OLD dietitian's whoUser
    userModel.findOneAndUpdate(
      { user_email: req.body.oldDietitianEmail },
      { $pull: { whoUser: req.body.whoUser } },
      function (err) {
        if (err) return res.status(400);
      }
    );

    // Adding current user email to NEW dietitian's whoUser array
    userModel.findOneAndUpdate(
      { user_email: req.query.dietitian },
      { $addToSet: { whoUser: req.body.whoUser } },
      { upsert: true, new: true, setDefaultsOnInsert: true },

      function (err) {
        if (err) return res.status(400);
      }
    );

    return res.status(200);
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
    return res.status(200).send("A Ok");
  })
);

export default userRouter;
