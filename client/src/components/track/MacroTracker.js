import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Table from "react-bootstrap/Table";
// import ProgressBar from "react-bootstrap/ProgressBar";

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

export default function MacroTracker({ authProps, date }) {
  const [intakeHistory, setIntakeHistory] = useState([]);
  const [dailyIntake, setDailyIntake] = useState([]);
  // const []
  // const [calories, setCalories] = useState(0);
  // const [nutrientIntake, setNutrientIntake] = useState([]);

  const getIntakeHistory = (resData) => {
    let intaken_list = [];
    // for each food in the day's food history
    resData.forEach((dataObjs) => {
      let single_food = []
      // Getting calorie counts
      let intaken_item = {
        vitamin_name: "calories",
        nutrient_quantity: Number((parseFloat(dataObjs.calories)).toFixed(1))
      };
      single_food.push(intaken_item)
      // Getting each nutrient amount
      dataObjs.nutrients.forEach((nut_item) => {
        intaken_item = {
          vitamin_name: nut_item.nutrient_name.split(',')[0].replaceAll('-', ''),
          nutrient_quantity: parseFloat(nut_item.nutrient_quantity)
        };
        single_food.push(intaken_item)
      });

      // accumulating foods 
      if (intaken_list.length > 0) {
        intaken_list = Object.values(
          intaken_list.concat(single_food).reduce((acc, {nutrient_quantity, vitamin_name})=>{
            (acc[vitamin_name] ??= {vitamin_name, nutrient_quantity: 0}).nutrient_quantity += parseFloat(nutrient_quantity);
            return acc;
          }, {})
        );
      } else {
        intaken_list = single_food
      }
    });
    return intaken_list
  };

  const getIntakeHistoryData = async () => {
    await axios
      .get(
        `http://localhost:8000/api/food-history/get-date?user_email=${
          authProps.user.user_email
        }&date=${date.toLocaleDateString().replaceAll("/", "-")}`
      )
      .then((res) => {
        setIntakeHistory(
          getIntakeHistory(res.data));
      })
      .catch((err) => {
        toast.error(err.message);
        console.log(err.message);
      });
  };

  const getUserIntakes = (resData) => {
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
    getIntakeHistoryData();
    getDailyIntakeData();
  }, [date]);

  return (
    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
      <Table className="min-w-full divide-y divide-gray-300">
        <thead>
          <tr>
            <th>Macro</th>
            <th>Total</th>
            <th>Goal</th>
            <th>Left</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200 bg-white">
          {/* {console.log("dailyIntake: ", dailyIntake)} */}
          {dailyIntake.length >= 35 && (
            <>
              <tr className="h-16 m-auto" >
                <td>
                  <div>
                    {console.log('dailyIntake', dailyIntake)}
                    {console.log('intakeHistory', intakeHistory)}
                    <p>Data 1</p>
                    <p className="absolute">@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@</p>
                  </div>
                </td>
                <td>Data 2</td>
                <td>Data 3</td>
                <td>Data 4</td>
              </tr>
            </>
          )}
        </tbody>
      </Table>
    </div>
  );
}
