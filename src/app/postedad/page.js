"use client";
import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";

const AllAds = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const res = await fetch("https://my-ads-back.onrender.com/api/allAds");
        const data = await res.json();
        setAds(data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch ads", err);
        setLoading(false);
      }
    };

    fetchAds();
  }, []);

  if (loading) return <p>Loading ads...</p>;

  return (
    <div className="ads-section">
      <p className="section-heading">Fresh recommendations</p>

      <div className="ads-grid">
        {ads.map((ad) => (
          <div key={ad._id} className="ad-card">
            <div className="image-wrapper">
              <img src={ad?.images?.[0]} alt={ad.title} />
              <div className="heart-icon">
                <FaHeart size={14} />
              </div>
            </div>

            <div className="ad-price">₹ {ad.price}</div>
            <div className="ad-title">{ad.title}</div>
            <div className="ad-location">
              {ad.city}, {ad.state}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllAds;
