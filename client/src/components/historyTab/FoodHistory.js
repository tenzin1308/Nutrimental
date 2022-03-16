import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Table from "./Table";

function FoodHistory({ user_email }) {
  const [foodHistory, setFoodHistory] = useState([]);

  useEffect(async () => {
    await axios
      .get(`/api/food-history/get?user_email=${user_email}/`)
      .then((res) => {
        setFoodHistory(res.data);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }, [user_email]);

  const column = [
    { heading: "Date", value: "date" },
    { heading: "Food Name", value: "food_name" },
    { heading: "Amount", value: "amount" },
    { heading: "Calories", value: "calories" },
  ];

  return (
    <div className="MacroTracker">
      <h1>Food History Tracker</h1>
      <Table user_email={user_email} data={foodHistory} column={column} />
    </div>
  );
}

export default FoodHistory;
