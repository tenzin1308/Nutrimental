import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import AccountLayout from "../components/AccountLayout";

const Searched = () => {
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState([
    {
      food_name: "{%FOOD_NAME%}",
      calories: "{%CALORIES%}",
      amount: "{%QUANTITY_IN_GRAMS%}",
      nutrients: [
        {
          nutrient_name: "{%NAME%}",
          nutrient_quantity: "{%QUANTITY%}",
        },
      ],
    },
  ]);
  const location = useLocation();

  useEffect(() => {
    console.log(location.state.items);
    setData(location.state.items);
    setLoading(location.state.loading);
  }, [location.state]);

  return (
    <AccountLayout
      showTabs={false}
      className={`${data.length > 0 ? "py-4 w-[60rem]" : "py-36 w-[50rem]"}`}
    >
      {!loading && data.length > 0 ? (
        <ul className="space-y-3">
          {data.map((item, i) =>
            "vitamin_name" in item ? (
              <li
                key={`${i} ${item.vitamin_name}`}
                className="bg-white shadow overflow-hidden px-4 py-4 sm:px-6 sm:rounded-md"
              >
                {console.log("vitamin ", item)}
                <p className="text-2xl">{item.vitamin_name}</p>
              </li>
            ) : (
              "description" in item && (
                <li
                  key={`${i} ${item.description}`}
                  className="bg-white shadow overflow-hidden px-4 py-4 sm:px-6 sm:rounded-md"
                >
                  {console.log("food ", item)}
                  <p className="text-2xl">{item.description}</p>
                </li>
              )
            )
          )}
        </ul>
      ) : (
        <div className="justify-center items-center text-center">
          <h1 className="text-6xl mb-12 font-bold">Search page</h1>
          <p className="text-xl">No Data was found, please try again</p>
        </div>
      )}
    </AccountLayout>
  );
};

export default Searched;
