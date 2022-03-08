import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Table from 'react-bootstrap/Table'
import ProgressBar from 'react-bootstrap/ProgressBar'

export default function MacroTracker({ user_email }) {
  const [foodHistory, setFoodHistory] = useState([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getFoodHistoryData = useEffect(async () => {
    await axios
      .get(`http://localhost:8000/api/food-history/get?user_email=${user_email}`)
      .then((res) => {
        setFoodHistory((res.data));
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }, []);

  // variables to tally up
  let calories = 0
  let carbs = 0
 /*  let proteins = 0 */
  let amount = 0

  foodHistory.forEach((obj) => {
    calories += parseInt(obj.calories);
    carbs += parseInt(obj.nutrients[0].nutrient_quantity);
    /* proteins += parseInt(obj.nutrients[1].nutrient_quantity); */
    amount += parseInt(obj.amount);
    console.log(obj.nutrients[0].nutrient_name); // Continue from HERE!
})

  let left = amount-carbs
  let progress = (carbs/amount)*100

  console.log(progress)
  console.log(calories)
  console.log(amount)
  console.log(carbs)
  /* console.log(proteins) */


  return (
    <>
    {console.log(foodHistory)}

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
    <tr>
      <td>Protein</td>
      <td>null</td>
      <td>null</td>
      <td>null</td>
    </tr>
    <tr>
      <td colSpan={4}><ProgressBar now={0} /></td>
    </tr>
    <tr>
      <td>Carbohydrate</td>
      <td>{carbs}</td>
      <td>{amount}</td>
      <td>{left}</td>
    </tr>
    <tr>
      <td colSpan={4}><ProgressBar now={progress} /></td>
    </tr>
    <tr>
      <td>Fiber</td>
      <td>null</td>
      <td>null</td>
      <td>null</td>
    </tr>
    <tr>
      <td colSpan={4}><ProgressBar now={0} /></td>
    </tr>
  </tbody>
</Table>
    </>
  )
};