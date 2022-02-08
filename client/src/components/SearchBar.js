import React, { useState } from "react";

const SearchBar = () => {
  const [searchTxt, setSearchTxt] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(searchTxt);
  };

  const handleChange = (event) => {
    setSearchTxt(event.target.value);
  };

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
        className="bg-gray-50 focus:outline-none focus-within:border-blue-700"
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
