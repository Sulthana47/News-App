import React, { useState } from "react";
import { Link } from "react-router-dom";
import './style.css';

const Header = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    onSearch(query);
  };

  const handleClear = () =>{
    setQuery("")
    onSearch("");
  }

  return (
    <header>
      <h1>Newsly</h1>
      <input
        type="text"
        placeholder="Search articles..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <button onClick={handleClear}>Clear</button>
      <Link to="/custom" className="custom-btn">Customize Feed</Link>
    </header>
  );
};

export default Header;
