import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Table from "react-bootstrap/Table";
import ProgressBar from "react-bootstrap/ProgressBar";

export default function MacroTracker({ user_email, date }) {
  const [foodHistory, setFoodHistory] = useState([]);
  const [calories, setCalories] = useState(0);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getFoodHistoryData = async () => {
    await axios
      .get(
        `http://localhost:8000/api/food-history/get-date?user_email=${user_email}&date=${date
          .toLocaleDateString()
          .replaceAll("/", "-")}`
      )
      .then((res) => {
        setFoodHistory(res.data);
        accumulator(res.data);
        // console.log(res.data);
      })
      .catch((err) => {
        toast.error(err.message);
        console.log(err.message);
      });
  };

  useEffect(() => {
    getFoodHistoryData();
  }, [date]);

  // foodHistory.forEach((obj) => {
  //   calories += parseInt(obj.calories);
  //   carbs += parseInt(obj.nutrients[0].nutrient_quantity);
  //   /* proteins += parseInt(obj.nutrients[1].nutrient_quantity); */
  //   amount += parseInt(obj.amount);
  //   console.log(obj.nutrients[0].nutrient_name); // Continue from HERE!
  // });

  const accumulator = (resData) => {
    let totalCal = 0;
    console.log(resData);
    resData.map((val) => {
      // console.log("testFunc -> ", val.food_name, val.calories);
      totalCal += parseFloat(val.calories);
      val.nutrients.map((innerVal) => {
        // console.log(
        //   "innerTestFunc -> ",
        //   innerVal.nutrient_name,
        //   parseFloat(innerVal.nutrient_quantity) + 1
        // );
      });
    });
    setCalories(totalCal);
    console.log("total calories for the day: ", totalCal);
  };

  // let left = amount - carbs;
  // let progress = (carbs / amount) * 100;

  /* console.log(proteins) */

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
          {/* <td colSpan={4}><ProgressBar now={progress} /></td> */}
        </tbody>
      </Table>
    </div>
  );
}
