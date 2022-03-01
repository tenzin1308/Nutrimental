import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function MacroTracker({ user_email }) {
  const [foodHistory, setFoodHistory] = useState(true);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    await axios
      .get(`api/food-history/get?user_email=${user_email}`)
      .then((res) => {
        setFoodHistory(res.data);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  });
  return <>
    {console.log(foodHistory)}
    
    </>;
}