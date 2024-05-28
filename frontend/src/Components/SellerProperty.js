import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SellerProperty() {
  const [sellerProperties, setSellerProperties] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let userId = sessionStorage.getItem("userId");

    if (userId) {
      const getSellerProperty = async () => {
        try {
          let response = await fetch(`https://rentifyappservice.azurewebsites.net/api/Property/${userId}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            }
          });

          if (response.status === 200) {
            let data = await response.json();
            
            setSellerProperties(data);
          } else {
            console.log("Failed to fetch properties:", response.statusText);
          }
        } catch (error) {
          console.error("Error fetching properties:", error);
        }
      };

      getSellerProperty();
    }
  }, []);

  const editProperty = (event, id) => {
    event.preventDefault();
    localStorage.setItem("proId", id);
    navigate("/EditProperty");
  };

  const deleteProperty = async (event, id) => {
    event.preventDefault();

    let response = await fetch(`https://rentifyappservice.azurewebsites.net/api/Property/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.status === 200) {
      navigate("/dashboard");
      toast.success("Deleted successfully");
    } else {
      toast.error("Error");
    }
  };

  return (
    <div className="flex flex-wrap gap-4  justify-center items-center">
      {sellerProperties.map((item) => (
        <div key={item.id} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div className="w-full h-60 flex-shrink-0 overflow-hidden">
            <img className="object-cover w-full h-full rounded-t-lg" src={item.filePath} alt="" />
          </div>
          <div className="p-5">
            <a href="/">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {item.address}
              </h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {item.description}
            </p>
            <button
              onClick={(event) => editProperty(event, item.id)}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              EDIT
              <svg
                className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </button>
            <button
              onClick={(event) => deleteProperty(event, item.id)}
              className="inline-flex items-center ml-36 px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            >
              DELETE
              <svg
                className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SellerProperty;
