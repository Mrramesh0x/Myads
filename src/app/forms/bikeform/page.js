"use client";
import React, { useState } from "react";
import PhotoUploader from "@/app/photoUploader/page";
import axios from "axios"
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";

const statesWithCities = {
  Maharashtra: ["Mumbai", "Pune", "Nagpur"],
  Delhi: ["New Delhi", "Dwarka", "Rohini"],
  Karnataka: ["Bangalore", "Mysore", "Mangalore"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Noida"],
};

const brandModels = {
  Honda: ["Shine", "Unicorn", "Hornet", "Activa"],
  Hero: ["Splendor", "HF Deluxe", "Passion Pro", "Xtreme"],
  TVS: ["Apache", "Jupiter", "Ntorq", "Sport"],
  Bajaj: ["Pulsar", "Avenger", "Platina", "CT 100"],
  Yamaha: ["FZ", "R15", "Fascino", "Ray ZR"],
  Suzuki: ["Gixxer", "Access", "Burgman"],
  RoyalEnfield: ["Classic 350", "Bullet", "Meteor", "Hunter 350"],
  KTM: ["Duke 200", "RC 390", "Adventure"],
};

const BikeForm = () => {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [kmDriven, setKmDriven] = useState("");
  const [owner, setOwner] = useState("");
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
 toast.success("Ad posted successfully!");
 setTimeout(() => {
        router.push("/");
      }, 5000);
    // console.log("Response:", res);
  } catch (err) {
    console.error("Error posting ad:", err);
  }
};

  return (
    <div className="carform-container">
      <h2>Include Some Details</h2>

      <label>Brand *</label>
      <select value={brand} onChange={(e) => {
        setBrand(e.target.value);
        setModel(""); // Reset model when brand changes
      }}>
        <option value="">Select Brand</option>
        {Object.keys(brandModels).map((b) => (
          <option key={b} value={b}>{b}</option>
        ))}
      </select>

      {brand && (
        <>
          <label>Model *</label>
          <select value={model} onChange={(e) => setModel(e.target.value)}>
            <option value="">Select Model</option>
            {brandModels[brand].map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </>
      )}

      <label>Year *</label>
      <input
        type="text"
        maxLength={4}
        value={year}
        onChange={(e) => setYear(e.target.value.replace(/\D/, ""))}
        placeholder="YYYY"
      />

      <label>Kilometers Driven *</label>
      <input
        type="text"
        value={kmDriven}
        onChange={(e) => setKmDriven(e.target.value.replace(/\D/, ""))}
        placeholder="Eg: 15000"
      />

      <label>No. of Owners *</label>
      <select value={owner} onChange={(e) => setOwner(e.target.value)}>
        <option value="">Select</option>
        <option value="1st">1st Owner</option>
        <option value="2nd">2nd Owner</option>
        <option value="3rd">3rd Owner</option>
        <option value="4th+">4th or more</option>
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

export default BikeForm;
