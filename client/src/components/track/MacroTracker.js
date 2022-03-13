import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Table from "react-bootstrap/Table";
// import ProgressBar from "react-bootstrap/ProgressBar";

export default function MacroTracker({ authProps, date }) {
  const [foodHistory, setFoodHistory] = useState([]);
  const [dailyIntake, setDailyIntake] = useState([]);
  const [calories, setCalories] = useState(0);
  const [nutrientIntake, setNutrientIntake] = useState([]);

  const getFoodHistoryData = async () => {
    await axios
      .get(
        `http://localhost:8000/api/food-history/get-date?user_email=${
          authProps.user.user_email
        }&date=${date.toLocaleDateString().replaceAll("/", "-")}`
      )
      .then((res) => {
        setFoodHistory(res.data);
        accumulator(res.data);
      })
      .catch((err) => {
        toast.error(err.message);
        console.log(err.message);
      });
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const getAge = (dateString) => {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const getUserIntakes = (resData) => {
    console.log(
      "user ",
      capitalizeFirstLetter(authProps.user.gender),
      getAge(authProps.user.dob)
    );
    let user_intake_info = [];
    resData.forEach((dataObjs) => {
      let itemIntakes = {
        vitamin_name: "",
        recommended_amount: 0,
        upper_tolerable_limit: 99999,
      };
      // Getting recommended_amount based on user
      let ra = dataObjs.recommended_amount.filter(
        (filtItem) =>
          filtItem.gender === 0 ||
          filtItem.gender === capitalizeFirstLetter(authProps.user.gender)
      );
      let rec_am = 0;
      ra.forEach((ra_item) => {
        if (ra_item.gender === capitalizeFirstLetter(authProps.user.gender)) {
          if (ra_item.age_group <= getAge(authProps.user.dob)) {
            rec_am = ra_item.amount;
          }
        } else {
          if (ra_item.age_group <= getAge(authProps.user.dob)) {
            rec_am = ra_item.amount;
          }
        }
      });

      // Getting upper_tolerable_limit amount based on user
      let upp_am = 0;
      dataObjs.upper_tolerable_limit.forEach((ra_item) => {
        if (ra_item.gender === capitalizeFirstLetter(authProps.user.gender)) {
          if (ra_item.age_group <= getAge(authProps.user.dob)) {
            if (ra_item.amount === "0") {
              upp_am = 99999;
            } else {
              upp_am = ra_item.amount;
            }
          }
        } else {
          if (ra_item.age_group <= getAge(authProps.user.dob)) {
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
    return user_intake_info;
  };

  const getDailyIntakeData = async () => {
    await axios
      .get("http://localhost:8000/api/daily-intake/get/")
      .then((res) => {
        setDailyIntake(getUserIntakes(res.data));
      })
      .catch((err) => {
        toast.error(err.message);
        console.log(err.message);
      });
  };

  useEffect(() => {
    getFoodHistoryData();
    getDailyIntakeData();
  }, [date]);

  const accumulator = (resData) => {
    let totalCal = 0;
    resData.forEach((val) => {
      totalCal += parseFloat(val.calories);
      val.nutrients.forEach((innerVal) => {
        let nutrient = {}; // object ///
        nutrient[innerVal.nutrient_name] =
          parseFloat(innerVal.nutrient_quantity) + 1; ///

        setNutrientIntake((nutrientIntake) => [...nutrientIntake, nutrient]);
      });
    });

    setCalories(totalCal);
    console.log("total calories for the day: ", totalCal);
  };

  return (
    <div className="flex flex-col">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Macro</th>
            <th>Total</th>
            <th>Goal</th>
            <th>Left</th>
          </tr>
        </thead>

        <tbody>
          {console.log("dailyIntake: ", dailyIntake)}
          {dailyIntake.length >= 35 && (
            <tr>
              <td>Loaded</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}
