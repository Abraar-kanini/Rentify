import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function PropertyDetails() {
  const PropertyId = localStorage.getItem("proId");
  const navigate = useNavigate();
  
  const [proDetails, setPropertyDetails] = useState(null);

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        let response = await fetch(
          `https://rentifyappservice.azurewebsites.net/api/Property/PropertyId/${PropertyId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        let responseData = await response.json();
        setPropertyDetails(responseData);
      } catch (error) {
        console.error("Error fetching property details:", error);
      }
    };
    fetchPropertyDetails();
  }, [PropertyId]);

  if (!proDetails) {
    return <div>Loading...</div>;
  }

  const SendEmailToBuyer = async () => {
    const userId = sessionStorage.getItem("userId");
    const formData = {
      Property_Id: PropertyId,
      User_Id: userId,
    };

    try {
      let response = await fetch(
        "https://rentifyappservice.azurewebsites.net/api/Property/IM INTRESTED",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        toast.success('Email sent successfully');
        navigate("/dashboard");
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      toast.error('Failed to send email');
      
    }
  };

  return (
    <>
      <div
        key={proDetails.id}
        className="block rounded-lg bg-white shadow-secondary-1 dark:bg-surface-dark dark:text-white text-surface"
      >
        <div className="relative overflow-hidden bg-cover bg-no-repeat">
          <div className="w-full h-96 flex-shrink-0 overflow-hidden">
            <img className="object-cover w-full h-full rounded-t-lg" src={proDetails.filePath} alt="" />
          </div>
        </div>
        <div className="p-6">
          <h5 className="mb-2 text-xl font-medium leading-tight">
            {proDetails.title}
          </h5>
          <p className="mb-4 text-base">{proDetails.description}</p>
          <p className="text-base text-surface/75 dark:text-neutral-300">
            <span>Number Of Bathrooms : {proDetails.numberOfBathrooms}</span> <br />
            <span>Number Of Bedrooms : {proDetails.numberOfBedrooms}</span> <br />
            <span>Is Near School: {proDetails.isNearSchool ? "Yes" : "No"}</span> <br />
            <span>Is Near Hospital : {proDetails.isNearHospital ? "Yes" : "No"}</span>
          </p>
          <br />
          <button
            onClick={SendEmailToBuyer}
            type="button"
            className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
          >
            I'M INTERESTED
          </button>
        </div>
      </div>
    </>
  );
}

export default PropertyDetails;
