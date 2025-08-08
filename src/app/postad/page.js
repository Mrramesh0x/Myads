"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  FaCar,
  FaHome,
  FaMobileAlt,
  FaBriefcase,
  FaMotorcycle,
  FaTv,
  FaTruck,
  FaCouch,
  FaChevronRight,
  FaArrowLeft
} from "react-icons/fa";

// Category and subcategory data
const categoryData = [
  {
    icon: <FaCar />,
    label: 'Cars',
    subcategories: ['Hatchback', 'SUV', 'Luxury', 'Sedan', 'Others']
  },
  {
    icon: <FaHome />,
    label: 'Properties',
    subcategories: ['For Sale: Apartments', 'PG & Guest Houses', 'Plots', 'Offices', 'Shops']
  },
  {
    icon: <FaMobileAlt />,
    label: 'Mobiles',
    subcategories: ['Smartphones', 'Accessories', 'Tablets']
  },
  {
    icon: <FaBriefcase />,
    label: 'Jobs',
    subcategories: ['Full-time', 'Part-time', 'Internships']
  },
  {
    icon: <FaMotorcycle />,
    label: 'Bikes',
    subcategories: ['Scooters', 'Sport Bikes', 'Cruiser']
  },
  {
    icon: <FaTv />,
    label: 'Electronics & Appliances',
    subcategories: ['TVs', 'Fridge', 'Washing Machine']
  },
  {
    icon: <FaTruck />,
    label: 'Commercial Vehicles',
    subcategories: ['Trucks', 'Buses', 'Pickups']
  },
  {
    icon: <FaCouch />,
    label: 'Furniture',
    subcategories: ['Sofas', 'Beds', 'Tables']
  }
];

const PostAd = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const router = useRouter();

  return (
    <>
    <div className="post-top-bar">
            <button className="back-button" onClick={() => router.back()}>
           <FaArrowLeft />
            </button>
          </div>
    <div className="postad-wrapper">
      <div className="postad-panel">
        <h2 className="postad-title">POST YOUR AD</h2>
        <div className="postad-box">
          {!selectedCategory ? (
            <>
              <h3 className="panel-heading">CHOOSE A CATEGORY</h3>
              <ul className="list">
                {categoryData.map((cat, idx) => (
                  <li key={idx} className="list-item" onClick={() => setSelectedCategory(cat)}>
                    <div className="list-left">
                      {cat.icon}
                      <span>{cat.label}</span>
                    </div>
                    <FaChevronRight className="arrow-icon" />
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <>
              <div className="back-row" onClick={() => setSelectedCategory(null)}>
                <FaArrowLeft /> <span>{selectedCategory.label}</span>
              </div>
              <ul className="list">
                {selectedCategory.subcategories.map((sub, i) => {
                  const categorySlug = selectedCategory.label.toLowerCase().replace(/\s+/g, "-");
                  const subSlug = sub.toLowerCase().replace(/\s+/g, "-");
                  return (
                    <li
                      key={i}
                      className="list-item"
                      onClick={() => router.push(`/postad/${categorySlug}/${subSlug}`)}
                    >
                      <div className="list-left">
                        <span>{sub}</span>
                      </div>
                      <FaChevronRight className="arrow-icon" />
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default PostAd;
