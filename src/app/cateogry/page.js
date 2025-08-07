"use client";
import React from "react";
import Link from "next/link";
import { MdArrowDropDown } from "react-icons/md";
import HeroAdSection from "../heroadsection/page";

const categories = [
  { name: "All Categories", path: "/postad" },
  { name: "Cars", path: "/postad/cars/hatchback" },
  { name: "Motorcycles", path: "/postad/bikes/sport-bikes" },
  { name: "Mobile Phones", path: "/postad/mobiles/smartphones" },
  { name: "For Sale: Houses & Apartments", path: "/postad/properties/for-sale:-apartments" },
  { name: "Scooters", path: "/postad/bikes/scooters" },
  { name: "Commercial & Other Vehicles", path: "/postad/commercial-vehicles/trucks" },
  { name: "For Rent: Houses & Apartments", path: "/postad/properties/for-sale:-apartments" },
];

const CategoryBar = () => {


  return (
    <div className="category-bar">
      {categories.map((cat, index) => (
        <Link key={index} href={cat.path} className="category-link">
          {cat.name === "All Categories" ? (
            <span className="category-dropdown">
              {cat.name} <MdArrowDropDown size={18} />
            </span>
          ) : (
            cat.name
          )}
        </Link>
      ))}
    </div>
    
  );
};

export default CategoryBar;
