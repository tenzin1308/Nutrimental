import express from "express";
import expressAsyncHandler from "express-async-handler";
import foodHistoryModel from "../models/foodHistoryModel.js";

const foodHistoryRouter = express.Router();

foodHistoryRouter.get(
  "/get/",
  expressAsyncHandler(async (req, res, err) => {
    const users_email = await foodHistoryModel.findOne({
      user_email: req.query.user_email,
    });
    if (users_email) {
      return res.status(200).json(users_email.history);
    }

    return res.status(400).send(err.stack);
  })
);
foodHistoryRouter.get(
  "/get-date/",
  expressAsyncHandler(async (req, res, err) => {
    const users_email = await foodHistoryModel.findOne({
      user_email: req.query.user_email,
    });
    if (users_email) {
      let history = [];
      users_email.history.map((item) => {
        if (
          new Date(req.query.date).toDateString() ===
          new Date(item.date).toDateString()
        ) {
          history.push(item);
        }
      });
      return res.send(history);
    }
    return res.sendStatus(400).send(err.stack);
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
            try {
              const newUser = new foodHistoryModel(req.body);
              newUser.save();
            } catch (err) {
              return res.status(450).send(err.stack);
            }
          }
        }
      }
    );
  })
);

foodHistoryRouter.delete(
  "/delete/",
  expressAsyncHandler(async (req, res, err) => {
    foodHistoryModel.updateOne(
      { user_email: req.query.user_email },
      { $pull: { history: { _id: req.query._id } } },
      function (err, result) {
        if (err) {
          res.send(400);
        } else {
          return res.send(200);
        }
      }
    );
  })
);
foodHistoryRouter.put(
  "/put/",
  expressAsyncHandler(async (req, res, err) => {
    try {
      await foodHistoryModel.findOne(
        { user_email: req.body.user_email },
        function (err, result) {
          if (err) res.status(400);
          else {
            // update subdocument in mongoose
            var update = result.history.filter((obj) => {
              return obj._id == req.body._id;
            });
            update[0].food_name = req.body.food_name;
            update[0].calories = req.body.calories;
            update[0].amount = req.body.amount;
            result.save();
            return res.status(200);
          }
        }
      );
    } catch (err) {
      return res.status(450).send(err.stack);
    }
  })
);

export default foodHistoryRouter;
