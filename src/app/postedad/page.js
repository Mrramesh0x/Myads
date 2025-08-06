"use client";
import { useEffect, useState } from "react";

const AllAds = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAds = async () => {
    try {
      const res = await fetch("https://my-ads-back.onrender.com/api/allAds");
      const data = await res.json();
      setAds(data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch ads:", error);
    }
  };

  useEffect(() => {
    fetchAds();
  }, []);

  if (loading) return <p>Loading ads...</p>;

  return (
    <div className="ads-container">
      {ads.length === 0 ? (
        <p>No ads yet</p>
      ) : (
        ads.map((ad, index) => (
          <div key={index} className="ad-card">
            {ad.images && ad.images.length > 0 && (
              <img
                src={ad.images[0]}
                alt={ad.title}
                className="ad-image"
              />
            )}
            <div className="ad-details">
              <h2 className="ad-title">{ad.title}</h2>
              <p className="ad-price">₹{ad.price}</p>
              <p className="ad-description">{ad.description}</p>
              <p>{ad.brand} - {ad.model}</p>
              <p>Driven: {ad.kmDriven} km | Owners: {ad.owners}</p>
              <p>Location: {ad.city}, {ad.state}</p>
              <p>Phone: {ad.phone}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AllAds;
