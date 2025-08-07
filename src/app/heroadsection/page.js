import React from "react";

const HeroAdSection = () => {
  return (
    <div className="hero-ad-section">
      <img
        src="/images/ad-sample.jpg" // Replace with your actual image path
        alt="Ad Banner"
        className="ad-image"
      />
      <div className="ad-text-content">
        <h2>Bekaert</h2>
        <p>Save steel & concrete - Dramix</p>
        <button className="cta-button">Learn More</button>
      </div>
    </div>
  );
};

export default HeroAdSection;
