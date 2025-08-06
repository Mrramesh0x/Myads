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

const PropertyForm = () => {
  const [type, setType] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [furnishing, setFurnishing] = useState("");
  const [status, setStatus] = useState("");
  const [area, setArea] = useState("");
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

      <label>Property Type *</label>
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="">Select Type</option>
        <option value="Apartment">Apartment</option>
        <option value="Independent House">Independent House</option>
        <option value="Plot / Land">Plot / Land</option>
        <option value="Villa">Villa</option>
        <option value="Commercial">Commercial</option>
      </select>

      <label>Bedrooms *</label>
      <select value={bedrooms} onChange={(e) => setBedrooms(e.target.value)}>
        <option value="">Select</option>
        {[1, 2, 3, 4, 5].map((num) => (
          <option key={num} value={num}>{num} BHK</option>
        ))}
      </select>

      <label>Bathrooms *</label>
      <select value={bathrooms} onChange={(e) => setBathrooms(e.target.value)}>
        <option value="">Select</option>
        {[1, 2, 3, 4].map((num) => (
          <option key={num} value={num}>{num}</option>
        ))}
      </select>

      <label>Furnishing *</label>
      <div className="button-group">
        {["Furnished", "Semi-Furnished", "Unfurnished"].map((f) => (
          <button
            key={f}
            type="button"
            className={furnishing === f ? "active" : ""}
            onClick={() => setFurnishing(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <label>Construction Status *</label>
      <div className="button-group">
        {["Ready to Move", "Under Construction"].map((s) => (
          <button
            key={s}
            type="button"
            className={status === s ? "active" : ""}
            onClick={() => setStatus(s)}
          >
            {s}
          </button>
        ))}
      </div>

      <label>Built-up Area (in sq.ft) *</label>
      <input
        type="text"
        value={area}
        onChange={(e) => setArea(e.target.value.replace(/\D/, ""))}
      />

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

export default PropertyForm;
