import React from "react";
import "./Navbar.css";
import menuicon from "../../assets/menu.png";
import logo from "../../assets/logo.png";
import searchicon from "../../assets/search.png";
import uploadicon from "../../assets/upload.png";
import moreicon from "../../assets/more.png";
import notificationicon from "../../assets/notification.png";
import profileicon from "../../assets/jack.png";
import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = ({ setSidebar, onSearch }) => {

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    console.log("i am in navbar and my query i search is  " + searchQuery)
    onSearch(searchQuery);

  };

  return (
    <nav className="flex-div">
      <div className="nav-left flex-div">
        <Link to='/'>
          <img src={menuicon} onClick={() => setSidebar(prev => !prev)} className="menu-icon" />
        </Link>

        <img src={logo} alt="" className="logo" />
      </div>

      <div className="nav-middle flex-div">
        <div className="search-box flex-div">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <img
            src={searchicon}
            alt="Search"
            onClick={handleSearch}
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>

      <div className="nav-right flex-div">
        <img src={uploadicon} alt="" />
        <img src={moreicon} alt="" />
        <img src={notificationicon} alt="" />
        <img src={profileicon} alt="" className="user-icon" />
      </div>
    </nav>
  );
};

export default Navbar;
