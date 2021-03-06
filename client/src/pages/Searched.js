import React, { useEffect } from "react";
import { Oval } from "react-loader-spinner";
import { useLocation } from "react-router-dom";
import AccountLayout from "../components/AccountLayout";
import SearchedItem from "../components/SearchedItem";

const Searched = ({ authProps }) => {
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState([]);
  const location = useLocation();

  useEffect(() => {
    setTimeout(() => {
      <Oval color="#00BFFF" height={80} width={80} />;
      setLoading(false);
    }, 3000);
  }, []);

  useEffect(() => {
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
          {data.map((item, i) => (
            <SearchedItem data={item} index={i} key={i} authProps={authProps} />
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
