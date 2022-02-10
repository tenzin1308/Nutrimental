import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import AccountLayout from "../components/AccountLayout";
import SearchedItem from "../components/SearchedItem";
import Spinner from "react-bootstrap/Spinner";

const Searched = () => {
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState([
    // {
    //   food_name: "{%FOOD_NAME%}",
    //   calories: "{%CALORIES%}",
    //   amount: "{%QUANTITY_IN_GRAMS%}",
    //   nutrients: [
    //     {
    //       nutrient_name: "{%NAME%}",
    //       nutrient_quantity: "{%QUANTITY%}",
    //     },
    //   ],
    // },
  ]);
  const location = useLocation();

  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    // console.log(location.state.items);
    setData(location.state.items);
    setLoading(location.state.loading);
  }, [location.state]);

  return (
    <AccountLayout
      showTabs={false}
      className={`${data.length > 0 ? "py-4 w-[60rem]" : "py-36 w-[50rem]"}`}
    >
      {loading ? (
        <Spinner
          animation="border"
          className="w-20 h-20 justify-center items-center"
        />
      ) : data.length > 0 ? (
        <ul className="space-y-3">
          {data.map((item, i) => (
            <SearchedItem data={item} index={i} key={i} />
          ))}
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
