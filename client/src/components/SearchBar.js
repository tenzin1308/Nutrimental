import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [searchTxt, setSearchTxt] = useState("");
  const [sendData, setSendData] = useState({});
  const [vitaminData, setVitaminData] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Logic made to check vitamin DB first.
  // If not in vitamin DB, checks the gov DB
  // Returns final data-sets in sendData
  // check loading.. if true, data isnt done.

  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchTxt.trim().length !== 0) {
      getVitaminDbData();
    } else {
      setSendData([]);
    }
  };

  const handleChange = (event) => {
    setSearchTxt(event.target.value);
  };

  const getGovApiData = async () => {
    await axios
      .get(
        // pageSize range = [1, 200]
        `https://api.nal.usda.gov/fdc/v1/foods/search?query=${searchTxt}&pageSize=200&api_key=8lipwf66SSWRVtn5S063QWheTJMSbN0ZySSf73Xv`
      )
      .then((res) => {
        setSendData([].concat(vitaminData, res.data.foods));
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const getVitaminDbData = async () => {
    await axios
      .get(`/api/vitamin/get?vitamin_name=${searchTxt}`)
      .then((res) => {
        setVitaminData(res.data);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const handlePush = () => {
    if (searchTxt.trim() !== "") {
      navigate(`/searched?id=${searchTxt}`, {
        state: { items: sendData, loading: loading },
      });
    }
  };

  // Tried using Callback setState(updater, callback()) to avoid messiness but there is delay, needs 2-3 clicks for adjustments
  useEffect(() => {
    getGovApiData();
  }, [vitaminData]);

  useEffect(() => {
    handlePush();
  }, [sendData]);

  return (
    <form
      className="relative flex flex-row justify-center items-center focus-within:border-blue-700 border-2 m-2 h-11"
      action="#"
      onSubmit={handleSubmit}
    >
      <input
        type="search"
        onChange={handleChange}
        placeholder="Search here"
        className="bg-gray-50 focus:outline-none focus:border-blue-700"
      />
      <button
        type="submit"
        className="absolute right-2 w-6 h-6 focus:outline-none focus-within:border-none"
      >
        <img
          src="https://img.icons8.com/external-dreamstale-lineal-dreamstale/32/000000/external-search-seo-dreamstale-lineal-dreamstale-7.png"
          alt="search-icon"
          className=""
        />
      </button>
    </form>
  );
};

export default SearchBar;
