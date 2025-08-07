"use client";

import React from "react";
import { FaBars, FaRegHeart } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { FiSearch } from "react-icons/fi";

const MobileNav = () => {
  return (
    <nav className="mobile-navbar">
      {/* Top Row */}
      <div className="mobile-top">
        {/* Hamburger Icon (Left) */}
        <FaBars className="hamburger-icon" />

        {/* OLX Logo with 8px gap */}
        <div className="mobile-logo-wrapper">
          <img
            src="https://statics.olx.in/external/base/img/olxLogo/olx_logo_2025.svg"
            alt="OLX Logo"
            className="mobile-olx-logo"
          />
        </div>

        {/* Location + Country Name (Right) */}
        <div className="mobile-location">
          <MdLocationOn className="mobile-location-icon" />
          <span className="mobile-country-name">Andaman & Nicobar</span>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="mobile-bottom">
        {/* Search Box */}
        <div className="mobile-search-container">
          <FiSearch className="mobile-search-icon" />
          <input
            type="text"
            placeholder='Search "Cars"'
            className="mobile-search-input"
          />
        </div>

        {/* Heart Icon */}
        <FaRegHeart className="mobile-heart-icon" />
      </div>
    </nav>
  );
};

export default MobileNav;
