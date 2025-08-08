"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import PhotoUploader from "@/app/photoUploader/page";

const carBrands = {
  Maruti: ["Alto", "Swift", "Baleno"],
  Hyundai: ["i10", "i20", "Creta"],
  Honda: ["City", "Civic", "Amaze"],
  Toyota: ["Innova", "Fortuner", "Glanza"],
};

const statesWithCities = {
  Maharashtra: ["Mumbai", "Pune", "Nagpur"],
  Delhi: ["New Delhi", "Dwarka", "Rohini"],
  Karnataka: ["Bangalore", "Mysore", "Mangalore"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Noida"],
};

const CarForm = () => {
  const router = useRouter();

  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
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
  const [activeTab, setActiveTab] = useState("list");

  // Step 1 — State for errors
  const [formErrors, setFormErrors] = useState({});

  // Function to validate a single field
  const validateField = (name, value) => {
    setFormErrors((prev) => ({
      ...prev,
      [name]: value.trim() === "" ? "Required" : "",
    }));
  };
const [isFormValid, setIsFormValid] = useState(false);

const checkFormValidity = () => {
  const requiredFieldsFilled = 
    brand.trim() &&
    model.trim() &&
    year.trim() &&
    fuel.trim() &&
    transmission.trim() &&
    kmDriven.trim() &&
    owners.trim() &&
    title.trim() &&
    description.trim() &&
    price.trim() &&
    state.trim() &&
    city.trim() &&
    phone.trim() &&
    images.length > 0;

  setIsFormValid(requiredFieldsFilled);
};






  const handlePriceChange = (e) => {
    const value = e.target.value.replace(/,/g, "");
    if (!isNaN(value)) {
      const formatted = Number(value).toLocaleString("en-IN");
      setPrice(formatted);
      validateField("price", value);
    }
  };

  const handleSubmit = async () => {
    try {
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
        fuel,
        transmission,
        kmDriven,
        owners,
        title,
        description,
        price,
        images: uploadedImageUrls,
        state,
        city,
        name,
        phone,
      };

      await axios.post(
        "https://my-ads-back.onrender.com/api/getform",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Ad posted successfully!");
      setTimeout(() => {
        router.push("/");
      }, 4000);
    } catch (error) {
      console.error("Error posting ad:", error);
      toast.error("Failed to post ad. Try again.");
    }
  };

  return (
    <div className="carform-container">
      <h2>INCLUDE SOME DETAILS</h2>

      <label>Brand *</label>
      <select
        value={brand}
        onChange={(e) => {
          setBrand(e.target.value);
          validateField("brand", e.target.value);
          checkFormValidity();
        }}
        onBlur={(e) => validateField("brand", e.target.value)}
      >
        <option value="">Select Brand</option>
        {Object.keys(carBrands).map((b) => (
          <option key={b} value={b}>
            {b}
          </option>
        ))}
      </select>
      {formErrors.brand && <span className="error-text">{formErrors.brand}</span>}

      {brand && (
        <>
          <label>Model *</label>
          <select
            value={model}
            onChange={(e) => {
              setModel(e.target.value);
              validateField("model", e.target.value);
              checkFormValidity();
            }}
            onBlur={(e) => validateField("model", e.target.value)}
          >
            <option value="">Select Model</option>
            {carBrands[brand].map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
          {formErrors.model && (
            <span className="error-text">{formErrors.model}</span>
          )}
        </>
      )}

      <label>Year *</label>
      <input
        type="text"
        maxLength={4}
        value={year}
        onChange={(e) => {
          setYear(e.target.value);
          validateField("year", e.target.value);
          checkFormValidity();
        }}
        onBlur={(e) => validateField("year", e.target.value)}
      />
      {formErrors.year && <span className="error-text">{formErrors.year}</span>}

      <label>Fuel *</label>
      <div className="button-group">
        {["Petrol", "Diesel", "CNG & Hybrids", "Electric", "LPG"].map(
          (option) => (
            <button
              key={option}
              type="button"
              className={`option-button ${fuel === option ? "active" : ""}`}
              onClick={() => {
                setFuel(option);
                validateField("fuel", option);
                checkFormValidity();
              }}
            >
              {option}
            </button>
          )
        )}
      </div>
      {formErrors.fuel && <span className="error-text">{formErrors.fuel}</span>}

      <label>Transmission *</label>
      <div className="button-group">
        {["Automatic", "Manual"].map((type) => (
          <button
            type="button"
            key={type}
            className={`option-button ${
              transmission === type ? "active" : ""
            }`}
            onClick={() => {
              setTransmission(type);
              validateField("transmission", type);
              checkFormValidity();
            }}
          >
            {type}
          </button>
        ))}
      </div>
      {formErrors.transmission && (
        <span className="error-text">{formErrors.transmission}</span>
      )}

      <label>KM Driven *</label>
      <div className="input-with-counter">
        <input
          type="text"
          maxLength={6}
          value={kmDriven}
          onChange={(e) => {
            const val = e.target.value.replace(/\D/g, "");
            setKmDriven(val);
            validateField("kmDriven", val);
            checkFormValidity();
          }}
          onBlur={(e) => validateField("kmDriven", e.target.value)}
        />
        <span className="char-counter">{kmDriven.length}/6</span>
      </div>
      {formErrors.kmDriven && (
        <span className="error-text">{formErrors.kmDriven}</span>
      )}

      <label>No. of Owners *</label>
      <div className="button-group">
        {["1st", "2nd", "3rd", "4th", "4+"].map((own) => (
          <button
            key={own}
            type="button"
            className={`option-button ${owners === own ? "active" : ""}`}
            onClick={() => {
              setOwners(own);
              validateField("owners", own);
              checkFormValidity();
            }}
          >
            {own}
          </button>
        ))}
      </div>
      {formErrors.owners && (
        <span className="error-text">{formErrors.owners}</span>
      )}

      <div className="input-with-counter">
        <label htmlFor="title">Ad Title *</label>
        <input
          type="text"
          id="title"
          maxLength={70}
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            validateField("title", e.target.value);
            checkFormValidity();
          }}
          onBlur={(e) => validateField("title", e.target.value)}
        />
        <div className="char-counter">{title.length}/70</div>
        {formErrors.title && (
          <span className="error-text">{formErrors.title}</span>
        )}
        <p className="helper-text">
          Mention the key features of your item (e.g. brand, model, age, type)
        </p>
      </div>

      <div className="input-with-counter">
        <label htmlFor="description">Description *</label>
        <textarea
          id="description"
          maxLength={4096}
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            validateField("description", e.target.value);
            checkFormValidity();
          }}
          onBlur={(e) => validateField("description", e.target.value)}
        />
        <div className="char-counter">{description.length}/4096</div>
        {formErrors.description && (
          <span className="error-text">{formErrors.description}</span>
        )}
        <p className="helper-text">
          Include condition, features and reason for selling
        </p>
      </div>

      <label>Set a Price *</label>
      <input
        type="text"
        value={price}
        onChange={handlePriceChange}
        onBlur={(e) => validateField("price", e.target.value)}
        placeholder="₹"
      />
      {formErrors.price && (
        <span className="error-text">{formErrors.price}</span>
      )}

      <PhotoUploader onUpload={setImages} />

      <hr className="section-divider" />
      <div className="location-section">
        <h2 className="section-heading">CONFIRM YOUR LOCATION</h2>

        <div className="location-switch">
          <div className="location-line-wrapper">
            <span
              className={`location-tab ${activeTab === "list" ? "active" : ""}`}
              onClick={() => setActiveTab("list")}
            >
              LIST
            </span>
            <span className="location-tab disabled">CURRENT LOCATION</span>
          </div>
          <div className="location-divider" />
        </div>
      </div>

      <label className="location-label">State *</label>
      <select
        value={state}
        onChange={(e) => {
          setState(e.target.value);
          validateField("state", e.target.value);
          checkFormValidity();
        }}
        onBlur={(e) => validateField("state", e.target.value)}
      >
        <option value="">Select State</option>
        {Object.keys(statesWithCities).map((st) => (
          <option key={st} value={st}>
            {st}
          </option>
        ))}
      </select>
      {formErrors.state && (
        <span className="error-text">{formErrors.state}</span>
      )}

      {state && (
        <>
          <label>City *</label>
          <select
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
              validateField("city", e.target.value);
              checkFormValidity();
            }}
            onBlur={(e) => validateField("city", e.target.value)}
          >
            <option value="">Select City</option>
            {statesWithCities[state].map((ct) => (
              <option key={ct} value={ct}>
                {ct}
              </option>
            ))}
          </select>
          {formErrors.city && (
            <span className="error-text">{formErrors.city}</span>
          )}
        </>
      )}

      <hr className="section-divider" />

      <p className="review-head">REVIEW YOUR DETAILS</p>
      <div className="review-user-row">
        <div className="review-user-avatar">
          <img src="/avatar.png" alt="User Avatar" className="avatar-img" />
        </div>

        <div className="review-user-input-wrapper">
          <label htmlFor="name" className="review-user-label">
            NAME *
          </label>
          <input
            type="text"
            id="name"
            className="review-user-input"
            maxLength={30}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              validateField("name", e.target.value);
              checkFormValidity();
            }}
            onBlur={(e) => validateField("name", e.target.value)}
            placeholder="Enter your name"
            required
          />
          {formErrors.name && (
            <span className="error-text">{formErrors.name}</span>
          )}
          <p className="review-user-charcount">{name.length}/30</p>
        </div>
      </div>

      <div className="review-verification-message">
        <h3 className="verification-heading">Let's verify your account</h3>
        <p className="verification-subtext">
          We will send you a confirmation code by SMS on the next step.
        </p>
      </div>

      <label className="verify-number">Mobile Phone Number *</label>
      <input
        type="tel"
        maxLength={10}
        value={phone}
        onChange={(e) => {
          const val = e.target.value.replace(/\D/, "");
          setPhone(val);
          validateField("phone", val);
          checkFormValidity();
        }}
        onBlur={(e) => validateField("phone", e.target.value)}
        placeholder="+91"
      />
      {formErrors.phone && (
        <span className="error-text">{formErrors.phone}</span>
      )}

      <hr className="section-divider" />
      <button
        onClick={handleSubmit}
        className="submit-btn"
        disabled={!isFormValid}
      >
        Post Now
      </button>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default CarForm;
