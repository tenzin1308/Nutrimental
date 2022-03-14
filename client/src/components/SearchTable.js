import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React from "react";
import toast from "react-hot-toast";

const columns = [
  {
    field: "nutrientName",
    property: "Vitamin Name",
    minWidth: 170,
    // align: "center",
  },
  {
    field: "value",
    property: "Vitamin Amount",
    minWidth: 170,
    // align: "center",
    // editable: true,
  },
  {
    field: "unitName",
    property: "Vitamin Amount Unit",
    minWidth: 170,
    // align: "center",
  },
];

const SearchTable = ({ data, authProps }) => {
  const [gridData] = React.useState(data.foodNutrients);
  const [serving, setServing] = React.useState(0);
  const [servingUnit, setServingUnit] = React.useState("");

  // function to run timer to wait before executing next line
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const handleServingChange = (e) => {
    setServing(e.target.value);
  };

  const handleServingUnitChange = (e) => {
    setServingUnit(e.target.value);
  };

  const newData = gridData.filter((item) => item.value > 0);
  newData.forEach((item, i) => {
    item.id = i + 1;
  });

  const dbData = newData.map((item) => ({
    nutrient_name: item.nutrientName,
    nutrient_quantity: item.value,
  }));

  const submitHandler = async () => {
    if (authProps.isAuthenticated) {
      // console.log( data.foodNutrients)
      await axios
        .post("/api/food-history/post/", {
          user_email: authProps.user.user_email,
          history: {
            food_name: data.description,
            calories: data.score,
            amount: serving,
            nutrients: dbData,
            serving_unit: servingUnit,
            date: new Date(),
          },
        })
        .then(async (res) => {
          await delay(2500);
          toast.success("Food added to history");
        })
        .catch((err) => {
          toast.error("Something went wrong");
        });
    } else {
      // ask to login or signup if not logged in yet and then add food to tracker
      toast.error("You must be logged in to add a food to your tracker");
    }
  };

  return (
    <>
      <div
        className="relative flex h-96 w-7/12 mx-auto overflow-hidden"
        // style={{ height: 400, width: "100%" }}
      >
        <DataGrid
          rows={newData}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          className="absolute pl-4 "
        />
      </div>
      <div className="flex justify-center items-center mt-2">
        <input
          required
          type="number"
          min={0}
          className="m-1"
          placeholder="Serving"
          onChange={handleServingChange}
        />
        <select
          required
          className="m-1"
          id="servingUnit"
          onChange={handleServingUnitChange}
        >
          <option value="oz">Ounce (oz)</option>
          <option value="lb">Pound (lb)</option>
          <option value="gm">grams (gm)</option>
          <option value="kg">kilograms (kg)</option>
        </select>

        <button
          className="bg-blue-700 text-white p-2 rounded-md ml-2"
          onClick={() => submitHandler()}
        >
          Add to Account
        </button>
      </div>
    </>
  );
};

export default SearchTable;
