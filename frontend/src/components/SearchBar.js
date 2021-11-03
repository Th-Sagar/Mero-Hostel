import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SearchBar.scss";

function SearchBar() {
  let [query, setQuery] = useState("");
  const searchValue = (e) => {
    setQuery((query = e.target.value));
  };
  console.log(query);
  return (
    <div className="searchbar">
      <input
        className="search-input"
        autoComplete="off"
        type="text"
        name="search"
        placeholder="Start your search"
        value={query}
        onChange={searchValue}
      />
      <Link to={`/hostel?search=${query}`}>
        <i className="fas fa-search search-btn"></i>
      </Link>
    </div>
  );
}

export default SearchBar;
