/* eslint-disable react-hooks/exhaustive-deps */
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Audio } from "react-loader-spinner";

// import ProgressBar from "react-bootstrap/ProgressBar";

const columns = [
  {
    field: "vitamin_name",
    property: "Macro Name",
    minWidth: 170,
    // align: "center",
  },
  {
    field: "nutrient_quantity",
    property: "Amount Consumed",
    minWidth: 170,
    // align: "center",
  },
  {
    field: "recommended_amount",
    property: "Recommended Amount",
    minWidth: 170,
    // align: "center",
    // editable: true,
  },
  {
    field: "amount_remaining",
    property: "Amount Remaining",
    minWidth: 170,
    // align: "center",
  },
  {
    field: "upper_tolerable_limit",
    property: "Upper Tolerable Limit",
    minWidth: 170,
    // align: "center",
  },
];

// const sampleRow = [
//   {
//     amount_remaining: 640,
//     id: 1,
//     nutrient_quantity: 360,
//     recommended_amount: "1000",
//     upper_tolerable_limit: "2500",
//     vitamin_name: "Calcium",
//   },
// ];

export default function MacroTracker({ authProps, date }) {
  const [intakeHistory, setIntakeHistory] = useState([]);
  const [dailyIntake, setDailyIntake] = useState([]);
  const [finalData, setFinalData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getIntakeHistory = (resData) => {
    let intaken_list = [];
    // for each food in the day's food history
    resData.forEach((dataObjs) => {
      let single_food = [];
      // Getting calorie counts
      let intaken_item = {
        vitamin_name: "calories",
        nutrient_quantity: Number(parseFloat(dataObjs.calories).toFixed(1)),
      };
      single_food.push(intaken_item);
      // Getting each nutrient amount
      dataObjs.nutrients.forEach((nut_item) => {
        intaken_item = {
          vitamin_name: nut_item.nutrient_name
            .split(",")[0]
            .replaceAll("-", ""),
          nutrient_quantity: parseFloat(nut_item.nutrient_quantity).toFixed(1), //
        };
        single_food.push(intaken_item);
      });

      // accumulating foods
      if (intaken_list.length > 0) {
        intaken_list = Object.values(
          intaken_list
            .concat(single_food)
            .reduce((acc, { nutrient_quantity, vitamin_name }) => {
              (acc[vitamin_name] ??= {
                vitamin_name,
                nutrient_quantity: 0,
              }).nutrient_quantity += parseFloat(nutrient_quantity); //
              return acc;
            }, {})
        );
      } else {
        intaken_list = single_food;
      }
    });
    return intaken_list;
  };

  const getIntakeHistoryData = async () => {
    await axios
      .get(
        `https://nutrimental-server.herokuapp.com/api/food-history/get-date?user_email=${
          authProps.user.user_email
        }&date=${date.toLocaleDateString().replaceAll("/", "-")}/`
      )
      .then((res) => {
        setIntakeHistory(getIntakeHistory(res.data));
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };


  const getDailyIntakeData = async () => {
    await axios
      .get("https://nutrimental-server.herokuapp.com/api/daily-intake/get/", {
        params: authProps.user,
      })
      .then((res) => {
        setDailyIntake(res.data);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const getFinalData = (arr1, arr2) => {
    setLoading(true);
    let id = 0;
    let merged = arr1.map((itm) => ({
      ...arr2.find((item) => item.vitamin_name === itm.vitamin_name && item),
      ...itm,
    }));

    if (merged.length > 0) {
      merged.forEach((obj) => {
        id++;
        obj["id"] = id;
        if (!("nutrient_quantity" in obj)) {
          obj["nutrient_quantity"] = 0;
        }
        // if (!obj.hasOwnProperty("nutrient_quantity")) {
        //   obj["nutrient_quantity"] = 0;
        // }
        obj["amount_remaining"] =
          obj.recommended_amount - obj.nutrient_quantity;
      });
    }
    setFinalData(merged);
  };

  useEffect(() => {
    getIntakeHistoryData();
    getDailyIntakeData();
  }, [date]);

  useEffect(() => {
    // if (intakeHistory.length > 0) {
    //   getFinalData(dailyIntake, intakeHistory);
    // }

    getFinalData(dailyIntake, intakeHistory);
    setLoading(false);
  }, [dailyIntake, intakeHistory]);

  useEffect(() => {}, [finalData]);

  return (
    <div className=" h-[70vh] w-full mx-auto overflow-scroll">
      {dailyIntake.length < 35 ? (
        <div className="flex items-center justify-center content-center">
          <div className="flex flex-col items-center">
            <Audio
              height="100"
              width="100"
              //  color="grey"

              ariaLabel="loading"
            />
            <h3 className="flex justify-center py-4">Populating Data</h3>
          </div>
        </div>
      ) : (
        <DataGrid
          // rows={loading ? sampleRow : finalData}
          rows={finalData}
          columns={columns}
          pageSize={15}
          rowsPerPageOptions={[5, 15, 25, 35]}
          disableSelectionOnClick
        />
      )}
    </div>
  );
}
