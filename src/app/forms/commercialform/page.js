"use client";
import React, { useState } from "react";
import PhotoUploader from "@/app/photoUploader/page";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";

const statesWithCities = {
  Maharashtra: ["Mumbai", "Pune", "Nagpur"],
  Delhi: ["New Delhi", "Dwarka", "Rohini"],
  Karnataka: ["Bangalore", "Mysore", "Mangalore"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Noida"],
};

const CommercialVehicleForm = () => {
  const [vehicleType, setVehicleType] = useState("");
  const [brand, setBrand] = useState("");
  const [year, setYear] = useState("");
  const [fuel, setFuel] = useState("");
  const [transmission, setTransmission] = useState("");
  const [kmDriven, setKmDriven] = useState("");
  const [owners, setOwners] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [images, setImages] = useState([]);
const router = useRouter();
  const handlePriceChange = (e) => {
    const value = e.target.value.replace(/,/g, "");
    if (!isNaN(value)) {
      const formatted = Number(value).toLocaleString("en-IN");
      setPrice(formatted);
    }
  };

    const handleSubmit = async () => {

const uploadedImageUrls = [];
for (const file of images) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "getslip");
      formData.append("cloud_name", "dcqyiaxed");

  const cloudRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dcqyiaxed/image/upload",
        formData
      );

      uploadedImageUrls.push(cloudRes.data.secure_url);

}

    
  const formData = {
    brand,
    model,
    year,
    kmDriven,
    title,
    description,
    price,
    images: uploadedImageUrls, // You need to get these from Cloudinary
    state,
    city,
    phone,
  };

  try {
   
const res = await axios.post("https://my-ads-back.onrender.com/api/getform",formData,{
   headers: {
    "Content-Type": "application/json",
  },
})
    // console.log("Response:", res);
     toast.success("Ad posted successfully!");
     setTimeout(() => {
            router.push("/");
          }, 5000);
  } catch (err) {
    console.error("Error posting ad:", err);
  }
};

  return (
    <div className="carform-container">
      <h2>Include Some Details</h2>

      <label>Type *</label>
      <select value={vehicleType} onChange={(e) => setVehicleType(e.target.value)}>
        <option value="">Select Type</option>
        <option value="Truck">Truck</option>
        <option value="Bus">Bus</option>
        <option value="Auto Rickshaw">Auto Rickshaw</option>
        <option value="Loader">Loader</option>
        <option value="Tractor">Tractor</option>
        <option value="Other">Other</option>
      </select>

      <label>Brand *</label>
      <input
        type="text"
        maxLength={30}
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
      />

      <label>Year of Purchase *</label>
      <input
        type="text"
        maxLength={4}
        value={year}
        onChange={(e) => setYear(e.target.value)}
        placeholder="e.g., 2020"
      />

      <label>Fuel *</label>
      <div className="option-buttons">
        {["Petrol", "Diesel", "CNG", "Electric", "Hybrid"].map((option) => (
          <button
            key={option}
            type="button"
            className={fuel === option ? "active" : ""}
            onClick={() => setFuel(option)}
          >
            {option}
          </button>
        ))}
      </div>

      <label>Transmission *</label>
      <div className="option-buttons">
        {["Manual", "Automatic"].map((option) => (
          <button
            key={option}
            type="button"
            className={transmission === option ? "active" : ""}
            onClick={() => setTransmission(option)}
          >
            {option}
          </button>
        ))}
      </div>

      <label>KM Driven *</label>
      <input
        type="text"
        value={kmDriven}
        onChange={(e) => setKmDriven(e.target.value.replace(/\D/, ""))}
        placeholder="e.g., 50000"
      />

      <label>No. of Owners *</label>
      <select value={owners} onChange={(e) => setOwners(e.target.value)}>
        <option value="">Select</option>
        <option value="1st">1st</option>
        <option value="2nd">2nd</option>
        <option value="3rd">3rd</option>
        <option value="4th or more">4th or more</option>
      </select>

      <label>Ad Title *</label>
      <div className="input-with-counter">
        <input
          type="text"
          maxLength={70}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <span className="char-counter">{title.length}/70</span>
      </div>

      <label>Description *</label>
      <div className="input-with-counter">
        <textarea
          maxLength={4096}
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <span className="char-counter">{description.length}/4096</span>
      </div>

      <label>Set a Price *</label>
      <input
        type="text"
        value={price}
        onChange={handlePriceChange}
        placeholder="₹"
      />

      <PhotoUploader onUpload={setImages} />

      <label>State *</label>
      <select value={state} onChange={(e) => setState(e.target.value)}>
        <option value="">Select State</option>
        {Object.keys(statesWithCities).map((st) => (
          <option key={st} value={st}>{st}</option>
        ))}
      </select>

      {state && (
        <>
          <label>City *</label>
          <select value={city} onChange={(e) => setCity(e.target.value)}>
            <option value="">Select City</option>
            {statesWithCities[state].map((ct) => (
              <option key={ct} value={ct}>{ct}</option>
            ))}
          </select>
        </>
      )}

      <h3>Review Your Details</h3>

      <label>Name</label>
      <input
        type="text"
        maxLength={30}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>Mobile Phone Number *</label>
      <input
        type="tel"
        value={phone}
        maxLength={10}
        onChange={(e) => setPhone(e.target.value.replace(/\D/, ""))}
        placeholder="+91"
      />

      <button onClick={handleSubmit} className="submit-btn">Post Now</button>
 <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default CommercialVehicleForm;
