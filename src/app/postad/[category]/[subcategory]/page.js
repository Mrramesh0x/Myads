"use client";

import React from "react";
import { useRouter } from "next/navigation";
import BikeForm from "@/app/forms/bikeform/page";
import CarForm from "@/app/forms/carform/page";
import CommercialVehicleForm from "@/app/forms/commercialform/page";
import ElectronicsForm from "@/app/forms/electronicform/page";
import FurnitureForm from "@/app/forms/furnitureform/page";
import JobsForm from "@/app/forms/jobsform/page";
import MobileForm from "@/app/forms/mobileform/page";
import PropertyForm from "@/app/forms/propertyform/page";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaArrowLeft } from "react-icons/fa";

const AdFormPage = ({ params }) => {
  const router = useRouter();
  const category = decodeURIComponent(params.category);
  const subcategory = decodeURIComponent(params.subcategory);

  const handleRedirect = () => {
    router.push(`/postad`); // Change path if needed
  };

  const renderForm = () => {
    const lowerCategory = category.toLowerCase();

    if (lowerCategory === "cars") return <CarForm />;
    if (lowerCategory === "properties") return <CarForm />;
    if (lowerCategory === "mobiles") return <CarForm />;
    if (lowerCategory === "jobs") return <CarForm />;
    if (lowerCategory === "bikes") return <CarForm />;
    if (lowerCategory === "electronics-&-appliances") return <CarForm />;
    if (lowerCategory === "commercial-vehicles") return <CarForm />;
    if (lowerCategory === "furniture") return <CarForm />;

    return <p>No form available for this category.</p>;
  };

  return (
    <>
      {/* OLX style top bar */}
      <div className="post-top-bar">
        <button className="back-button" onClick={() => router.back()}>
       <FaArrowLeft />
        </button>
      </div>
      <div className="post-ad-wrapper">
        <h1 className="post-ad-title">POST YOUR AD</h1>

        <div className="post-ad-box">
          <div className="selected-category-label">SELECTED CATEGORY</div>

          <div className="category-path-container">
            <p className="category-path">
              {category} / {subcategory}
            </p>
            <button onClick={handleRedirect} className="change-link">
              Change
            </button>
          </div>

          <div style={{ width: "100%" }}>
            <div className="divider"></div>
          </div>

          <div className="form-section">{renderForm()}</div>
        </div>
      </div>
    </>
  );
};

export default AdFormPage;
