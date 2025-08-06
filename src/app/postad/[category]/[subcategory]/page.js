import BikeForm from "@/app/forms/bikeform/page";
import CarForm from "@/app/forms/carform/page";
import CommercialVehicleForm from "@/app/forms/commercialform/page";
import ElectronicsForm from "@/app/forms/electronicform/page";
import FurnitureForm from "@/app/forms/furnitureform/page";
import JobsForm from "@/app/forms/jobsform/page";
import MobileForm from "@/app/forms/mobileform/page";
import PropertyForm from "@/app/forms/propertyform/page";

const AdFormPage = ({ params }) => {
  const category = decodeURIComponent(params.category);
  const subcategory = decodeURIComponent(params.subcategory);

  const renderForm = () => {
    const lowerCategory = category.toLowerCase();

    if (lowerCategory === "cars") return <CarForm />;
    if (lowerCategory === "properties") return <PropertyForm />;
     if (lowerCategory === "mobiles") return <MobileForm />;
    if (lowerCategory === "jobs") return <JobsForm />;
    if (lowerCategory === "bikes") return <BikeForm />;
    if (lowerCategory === "electronics-&-appliances") return <ElectronicsForm/>;
    if (lowerCategory === "commercial-vehicles") return <CommercialVehicleForm/>
    if (lowerCategory === "furniture") return <FurnitureForm/>;
    
    // Add more categories...
    
    return <p>No form available for this category.</p>;
  };

  return (
    <div className="adform-container">
      <div className="adform-box">
        <h1 className="adform-title">Post Your Ad</h1>
        <p className="adform-selected">
          Selected Category:
          <span className="highlight"> {category}</span> /
          <span className="highlight"> {subcategory}</span>
        </p>

        {renderForm()}
      </div>
    </div>
  );
};

export default AdFormPage;
