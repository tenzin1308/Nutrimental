import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const SearchBar = ({}) => {
  const [searchTxt, setSearchTxt] = useState("");
  const [sendData, setSendData] = useState({});
  const [vitaminData, setVitaminData] = useState({});
  const [loading, setLoading] = useState(true);

  // Logic made to check vitamin DB first.
  // If not in vitamin DB, checks the gov DB
  // Returns final data-sets in sendData
  // check loading.. if true, data isnt done.

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(searchTxt);

    getVitaminDbData();
  };

  useEffect(() => {
    if (vitaminData.length === 0) {
      getGovApiData();
    } else {
      setSendData(vitaminData);
    }
  }, [vitaminData]);

  const handleChange = (event) => {
    setSearchTxt(event.target.value);
  };

  const getGovApiData = async () => {
    await axios
      .get(
        // pageSize range = [1, 200]
        `https://api.nal.usda.gov/fdc/v1/foods/search?query=${searchTxt}&pageSize=10&api_key=${process.env.REACT_APP_USDA_GOV_API_KEY}`
      )
      .then((res) => {
        setSendData(res.data.foods);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const getVitaminDbData = async () => {
    await axios
      .get(`http://localhost:8000/api/vitamin/get?vitamin_name=${searchTxt}`)
      .then((res) => {
        setVitaminData(res.data);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  useEffect(() => {
    console.log("sendData ", sendData);
    setLoading(false);
  }, [sendData]);

  return (
    <form
      className="relative flex flex-row gap-x-2 mr-4 justify-center items-center focus-within:border-blue-700 border-2"
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
