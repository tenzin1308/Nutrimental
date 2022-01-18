import express from "express";
import expressAsyncHandler from "express-async-handler";
import foodHistoryModel from "../models/foodHistoryModel";

const foodHistoryRouter = express.Router();

foodHistoryRouter.get(
  "/get/user/",
  expressAsyncHandler(async (req, res, err) => {
    // Some Code in here
    const users_email = await foodHistoryModel.find({
      user_email: req.body.user_email,
    });
    if (users_email) {
      return res.send(users_email.history);
    }
    return res.status(404).send(err.stack);
  })
);

foodHistoryRouter.post(
  "/post/foodhistory/",
  expressAsyncHandler(async (req, res, err) => {
    // Some Code in here
    foodHistoryModel.exists(
      { user_email: req.body.user_email },
      function (err, result) {
        if (err) {
          res.send(err);
        } else {
          if (result) {
            console.log("found");
            // If found append it to the existing one
            foodHistoryModel.findOneAndUpdate(
              { user_email: req.body.user_email },
              { $push: { history: req.body.history } },
              { upsert: true, new: true, setDefaultsOnInsert: true },
              function (err, result) {
                if (err) res.send(400, { error: err });
                else return res.send(200, { response: result });
              }
            );
          } else {
            console.log("not FOUND");
            // If not found create new entry in database
            const foodHistorySchemaModel = foodHistoryModel(req.body);
            foodHistorySchemaModel
              .save()
              .then((result) => {
                console.log("result =>", result);
                res.send(200, { response: result });
              })
              .catch((err) => {
                console.log("err =>", err);
                res.send({ error: err });
              });
          }
        }
      }
    );
  })
);

export default foodHistoryRouter;
