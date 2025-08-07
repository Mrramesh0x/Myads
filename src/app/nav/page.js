"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { FaRegHeart, FaCommentDots, FaBell } from "react-icons/fa";
import { MdArrowDropDown } from "react-icons/md";

const Nav = () => {
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/postad");
  };

  return (
    <nav className="olx-navbar">
      {/* Left Section */}
      <div className="nav-left">
        <a href="/">
        <img
          src="https://statics.olx.in/external/base/img/olxLogo/olx_logo_2025.svg"
          alt="OLX Logo"
          className="olx-logo"
        />
        </a>

        {/* Location Selector */}
        <div className="location-selector">
          <img src="/search1.svg" className="location-icon" alt="Search" />
          <span className="location-text">Andaman & Nicobar Islands</span>
          <img src="/arrow-down.svg" className="dropdown-icon" alt="Arrow" />
        </div>

        {/* Search Input with Custom SVG */}
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder='Search "Jobs"'
          />
          <img src="/search1.svg" className="search-svg-icon" alt="Search Icon" />
        </div>
      </div>

      {/* Right Section */}
      <div className="nav-right">
        <div className="language-selector">
          ENGLISH <MdArrowDropDown size={20} />
        </div>
        <FaRegHeart size={20} className="nav-icon" />
        <FaCommentDots size={20} className="nav-icon" />
        <FaBell size={20} className="nav-icon" />

        <div className="profile-icon">
          <img src="/avatar.png" alt="Profile" />
        </div>

        <button onClick={handleRedirect} className="sell-button">
          <img src="/addButton.png" alt="Sell" />
        </button>
      </div>
    </nav>
  );
};

export default Nav;
