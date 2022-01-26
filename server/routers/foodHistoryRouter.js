import express from "express";
import expressAsyncHandler from "express-async-handler";
import foodHistoryModel from "../models/foodHistoryModel.js";

const foodHistoryRouter = express.Router();

foodHistoryRouter.get(
  "/get/",
  expressAsyncHandler(async (req, res, err) => {
    const users_email = await foodHistoryModel.findOne({
      user_email: req.body.user_email,
    });
    if (users_email) {
      return res.status(200).send(users_email.history);
    }

    return res.status(400).send(err.stack);
  })
);

foodHistoryRouter.post(
  "/post/",
  expressAsyncHandler(async (req, res, err) => {
    foodHistoryModel.exists(
      { user_email: req.body.user_email },
      function (err, result) {
        if (err) {
          res.send(err);
        } else {
          if (result) {
            console.log("User Found");
            foodHistoryModel.findOneAndUpdate(
              { user_email: req.body.user_email },
              { $push: { history: req.body.history } },
              { upsert: true, new: true, setDefaultsOnInsert: true },

              function (err, result) {
                if (err) res.send(400);
                else return res.send(200);
              }
            );
          } else {
            const insertEntry = foodHistoryModel(req.body);
            insertEntry
              .save()
              .then((result) => {
                res.status(200).send(result);
              })
              .catch((err) => {
                res.status(400).send(err);
              });
          }
        }
      }
    );
  })
);

foodHistoryRouter.delete(
  "/delete/",
  expressAsyncHandler(async (req, res, err) => {
    foodHistoryModel.update(
      { user_email: req.body.user_email },
      { $pull: { history: { _id: req.body["_id"] } } },
      function (err, result) {
        if (err) res.send(400);
        else return res.send(200);
      }
    );
  })
);

export default foodHistoryRouter;
