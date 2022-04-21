import express from "express";
import expressAsyncHandler from "express-async-handler";
import dailyIntakeModel from "../models/dailyIntakeModel.js";

const dailyIntakeRouter = express.Router();

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const getAge = (dateString) => {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate < birthDate.getDate())) {
    age--;
  }
  return age;
};

dailyIntakeRouter.get(
  "/get/",
  expressAsyncHandler(async (req, res, err) => {
    // Some Code in here
    const user = req.query;

    const nut = await dailyIntakeModel.find();

    let user_intake_info = [];

    nut.forEach((dataObjs) => {
      let itemIntakes = {
        vitamin_name: "",
        recommended_amount: 0,
        upper_tolerable_limit: 99999,
      };
      // Getting recommended_amount based on user
      let ra = dataObjs.recommended_amount.filter((filtItem) => {
        const gender = JSON.parse(JSON.stringify(filtItem)).gender;
        return gender === 0 || gender === capitalizeFirstLetter(user.gender);
      });
      let rec_am = 0;
      ra.forEach((ra_item) => {
        if (ra_item.gender === capitalizeFirstLetter(user.gender)) {
          if (ra_item.age_group <= getAge(user.dob)) {
            rec_am = ra_item.amount;
          }
        } else {
          if (ra_item.age_group <= getAge(user.dob)) {
            rec_am = ra_item.amount;
          }
        }
      });

      // Getting upper_tolerable_limit amount based on user
      let upp_am = 0;
      dataObjs.upper_tolerable_limit.forEach((ra_item) => {
        if (ra_item.gender === capitalizeFirstLetter(user.gender)) {
          if (ra_item.age_group <= getAge(user.dob)) {
            if (ra_item.amount === "0") {
              upp_am = 99999;
            } else {
              upp_am = ra_item.amount;
            }
          }
        } else {
          if (ra_item.age_group <= getAge(user.dob)) {
            if (ra_item.amount === "0") {
              upp_am = 99999;
            } else {
              upp_am = ra_item.amount;
            }
          }
        }
      });
      itemIntakes.vitamin_name = dataObjs.vitamin_name;
      itemIntakes.recommended_amount = rec_am;
      itemIntakes.upper_tolerable_limit = upp_am;
      user_intake_info.push(itemIntakes);
    });

    return res.send(user_intake_info);
  })
);

export default dailyIntakeRouter;
