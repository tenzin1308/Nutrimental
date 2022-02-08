import axios from "axios";
import React, { useEffect, useState } from "react";

export default function MacroTracker({ user_email }) {
  const [foodHistory, setFoodHistory] = useState(true);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    await axios
      .get(`api/food-history/get?user_email=${user_email}`)
      .then((res) => {
        console.log(res);
        setFoodHistory(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return <>placeholder</>;
}