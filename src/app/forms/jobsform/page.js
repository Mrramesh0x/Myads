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

const JobsForm = () => {
  const [jobType, setJobType] = useState("");
  const [category, setCategory] = useState("");
  const [experience, setExperience] = useState("");
  const [salary, setSalary] = useState("");
  const [company, setCompany] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
   const [images, setImages] = useState([]);
   const router = useRouter()

  const handleSalaryChange = (e) => {
    const value = e.target.value.replace(/,/g, "");
    if (!isNaN(value)) {
      const formatted = Number(value).toLocaleString("en-IN");
      setSalary(formatted);
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

      <label>Job Type *</label>
      <div className="button-group">
        {["Full Time", "Part Time", "Contract", "Internship"].map((type) => (
          <button
            key={type}
            type="button"
            className={jobType === type ? "active" : ""}
            onClick={() => setJobType(type)}
          >
            {type}
          </button>
        ))}
      </div>

      <label>Job Category *</label>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Select Category</option>
        <option value="IT">IT</option>
        <option value="Sales">Sales</option>
        <option value="Marketing">Marketing</option>
        <option value="Delivery">Delivery</option>
        <option value="Customer Support">Customer Support</option>
        <option value="Teaching">Teaching</option>
        <option value="Construction">Construction</option>
        <option value="Hospitality">Hospitality</option>
      </select>

      <label>Experience Required *</label>
      <select
        value={experience}
        onChange={(e) => setExperience(e.target.value)}
      >
        <option value="">Select Experience</option>
        <option value="Fresher">Fresher</option>
        <option value="0-1 Years">0-1 Years</option>
        <option value="1-3 Years">1-3 Years</option>
        <option value="3-5 Years">3-5 Years</option>
        <option value="5+ Years">5+ Years</option>
      </select>

      <label>Company Name *</label>
      <input
        type="text"
        maxLength={50}
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />

      <label>Salary (Monthly) *</label>
      <input
        type="text"
        value={salary}
        onChange={handleSalaryChange}
        placeholder="₹"
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

export default JobsForm;
