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

const mobileBrands = {
  Apple: ["iPhone 14", "iPhone 13", "iPhone 12"],
  Samsung: ["Galaxy S21", "Galaxy A52", "Galaxy M13"],
  Xiaomi: ["Redmi Note 10", "Mi 11X", "Redmi 12C"],
  OnePlus: ["Nord CE 2", "OnePlus 9", "OnePlus 11"],
};

const MobileForm = () => {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [storage, setStorage] = useState("");
  const [condition, setCondition] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [images, setImages] = useState([]);
  const router = useRouter()

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

      <label>Brand *</label>
      <select value={brand} onChange={(e) => setBrand(e.target.value)}>
        <option value="">Select Brand</option>
        {Object.keys(mobileBrands).map((b) => (
          <option key={b} value={b}>{b}</option>
        ))}
      </select>

      <label>Model *</label>
      <select
        value={model}
        onChange={(e) => setModel(e.target.value)}
        disabled={!brand}
      >
        <option value="">Select Model</option>
        {brand && mobileBrands[brand].map((m) => (
          <option key={m} value={m}>{m}</option>
        ))}
      </select>

      <label>Internal Storage (GB) *</label>
      <input
        type="text"
        value={storage}
        onChange={(e) => setStorage(e.target.value.replace(/\D/, ""))}
        maxLength={3}
      />

      <label>Condition *</label>
      <div className="button-group">
        {["New", "Like New", "Good", "Fair", "Poor"].map((c) => (
          <button
            type="button"
            key={c}
            className={condition === c ? "active" : ""}
            onClick={() => setCondition(c)}
          >
            {c}
          </button>
        ))}
      </div>

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

export default MobileForm;
