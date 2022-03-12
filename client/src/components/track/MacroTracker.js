import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Table from "react-bootstrap/Table";
import ProgressBar from "react-bootstrap/ProgressBar";

export default function MacroTracker({ user_email, date }) {
  const [foodHistory, setFoodHistory] = useState([]);
  const [calories, setCalories] = useState(0);
  const [nutrientIntake, setNutrientIntake] = useState([]); // array of an object
  // let nutrient = {}; //

  /* const [proteins, setProteins] = useState(0); // to DEL
  const [carbohydrates, setCarbohydrates] = useState(0); //
  const [fibers, setFibers] = useState(0); //
  const [sugars, setSugars] = useState(0); //
  const [fats, setFats] = useState(0); // */

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getFoodHistoryData = async () => {
    await axios
      .get(
        `http://localhost:8000/api/food-history/get-date?user_email=${user_email}&date=${date
          .toLocaleDateString()
          .replaceAll("/", "-")}`,
          console.log("Inside Get") //
      )
      .then((res) => {
        setFoodHistory(res.data);
        accumulator(res.data);
        console.log(res.data);
        console.log("inside then", foodHistory) //
      })
      .catch((err) => {
        toast.error(err.message);
        console.log(err.message);
      });
  };

  useEffect(() => {
    getFoodHistoryData();
  }, [date]);

  /* foodHistory.forEach((obj) => { // to DEL
    calories += parseInt(obj.calories);
    carbs += parseInt(obj.nutrients[0].nutrient_quantity);
    // proteins += parseInt(obj.nutrients[1].nutrient_quantity); 
    amount += parseInt(obj.amount);
    console.log(obj.nutrients[0].nutrient_name); 
  }); */

  const accumulator = (resData) => {
    let totalCal = 0;
    /* let totalProteins = 0; // to DEL
    let totalCarbohydrates = 0; //
    let totalFibers = 0; //
    let totalSugars = 0; //
    let totalFats = 0; // */

    console.log(resData);
    resData.map((val) => {
      console.log("testFunc -> ", val.food_name, val.calories);
      totalCal += parseFloat(val.calories);
      
      // totalProteins += parseFloat(val.proteins); //

      val.nutrients.map((innerVal) => {
        let nutrient = {}; // object ///
        nutrient[innerVal.nutrient_name] = parseFloat(innerVal.nutrient_quantity) + 1; ///
        
        setNutrientIntake(nutrientIntake => [...nutrientIntake, nutrient]) /// setTheArray(prevArray => [...prevArray, newValue])

        console.log(
          "innerTestFunc -> ",
          innerVal.nutrient_name,
          parseFloat(innerVal.nutrient_quantity) + 1
        );
      });
    });

    setCalories(totalCal);
    // setProteins(totalProteins); //
    console.log("total calories for the day: ", totalCal);
    // console.log("total proteins for the day: ", totalProteins); //
  };

 /*  let left = amount - carbs; // to DEL
  let progress = (carbs / amount) * 100;
  console.log(proteins) */

  // We don't want append, we need replace

  /* console.log("nutrient-test", nutrientIntake) //
  console.log("nutrient-test2", nutrient)
  console.log("nutrient-test3", nutrient[0]) */

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
      {console.log('nutrient: ', nutrientIntake)}
      {nutrientIntake.map((item, i) => ( // switched

      <React.Fragment key={i}>
      <tr>
          <th>{item.nutrient_name}</th> {/* This needs to be nutrient_name */}
          {/* <th>totalProteins</th>
          <th>goalProteins</th>
          <th>leftProteins</th> */}
        </tr>
        <tr>
          <td colSpan={4}><ProgressBar now={100} /></td>
        </tr>
      </React.Fragment>
        ))}
      </tbody>
      </Table>
    </div>
  );
}