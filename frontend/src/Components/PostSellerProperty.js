import React,{useState,useEffect} from "react";
import {  useNavigate } from 'react-router-dom';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EditSellerProperty() {
    
      


  const navigate = useNavigate();
  const [postData, setPostData] = useState({
    title: "",
    description: "",
    address: "",
    numberOfBedrooms: 0,
    numberOfBathrooms: 0,
    isNearSchool: false,
    isNearHospital: false,
    rentPerMonth: 0,
    carParking: 0,
    file: null,
    fileName: "",
    fileDescription: "",
    userId: ""
});

useEffect(() => {
    const userId = sessionStorage.getItem("userId");
    if (userId) {
        setPostData((prevData) => ({ ...prevData, userId }));
    }
}, []);

const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPostData({
        ...postData,
        [name]: type === 'checkbox' ? checked : value
    });
};

const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setPostData({
        ...postData,
        [name]: value === 'yes'
    });
};

const handleFileChange = (e) => {
    setPostData({
        ...postData,
        file: e.target.files[0],
        fileName: e.target.files[0].name
    });
};

const postSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    for (const key in postData) {
        formData.append(key, postData[key]);
    }

    try {
        const response = await fetch('https://localhost:7218/api/Property', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            
            toast.success("Your Property Posted Successfully")
            navigate("/SellerProperty")
        } else {
            
            toast.error("Error")
        }
    } catch (error) {
        console.error("Error posting property:", error);
    }
};
return (
    <form className="max-w-md mx-auto" onSubmit={postSubmit}>
        <div className="relative z-0 w-full mb-5 group">
            <input
                type="text"
                name="title"
                id="floating_title"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={postData.title}
                onChange={handleChange}
                required
            />
            <label
                htmlFor="floating_title"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
                Title
            </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
            <input
                type="text"
                name="description"
                id="floating_description"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={postData.description}
                onChange={handleChange}
                required
            />
            <label
                htmlFor="floating_description"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
                Description
            </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
            <input
                type="text"
                name="address"
                id="floating_address"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={postData.address}
                onChange={handleChange}
                required
            />
            <label
                htmlFor="floating_address"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
                Address
            </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
            <input
                type="number"
                name="rentPerMonth"
                id="floating_rentPerMonth"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={postData.rentPerMonth}
                onChange={handleChange}
                required
            />
            <label
                htmlFor="floating_rentPerMonth"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
                Rent Per Month
            </label>
            <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="user_avatar"
            >
                Upload file
            </label>
            <input
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                aria-describedby="user_avatar_help"
                id="user_avatar"
                type="file"
                onChange={handleFileChange}
            />
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
                <input
                    type="number"
                    name="numberOfBedrooms"
                    id="floating_numberOfBedrooms"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    value={postData.numberOfBedrooms}
                    onChange={handleChange}
                    required
                />
                <label
                    htmlFor="floating_numberOfBedrooms"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                    Number Of Bedrooms
                </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
                <input
                    type="number"
                    name="numberOfBathrooms"
                    id="floating_numberOfBathrooms"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    value={postData.numberOfBathrooms}
                    onChange={handleChange}
                    required
                />
                <label
                    htmlFor="floating_numberOfBathrooms"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                    Number Of Bathrooms
                </label>
            </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Is Near School
                </label>
                <div className="flex items-center mb-4">
                    <input
                        type="radio"
                        name="isNearSchool"
                        id="isNearSchool_yes"
                        value="yes"
                        checked={postData.isNearSchool === true}
                        onChange={handleRadioChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label htmlFor="isNearSchool_yes" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Yes
                    </label>
                </div>
                <div className="flex items-center">
                    <input
                        type="radio"
                        name="isNearSchool"
                        id="isNearSchool_no"
                        value="no"
                        checked={postData.isNearSchool === false}
                        onChange={handleRadioChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label htmlFor="isNearSchool_no" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        No
                    </label>
                </div>
            </div>
            <div className="relative z-0 w-full mb-5 group">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Is Near Hospital
                </label>
                <div className="flex items-center mb-4">
                    <input
                        type="radio"
                        name="isNearHospital"
                        id="isNearHospital_yes"
                        value="yes"
                        checked={postData.isNearHospital === true}
                        onChange={handleRadioChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label htmlFor="isNearHospital_yes" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Yes
                    </label>
                </div>
                <div className="flex items-center">
                    <input
                        type="radio"
                        name="isNearHospital"
                        id="isNearHospital_no"
                        value="no"
                        checked={postData.isNearHospital === false}
                        onChange={handleRadioChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label htmlFor="isNearHospital_no" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        No
                    </label>
                </div>
            </div>
            <div className="relative z-0 w-full mb-5 group">
                <input
                    type="number"
                    name="carParking"
                    id="floating_carParking"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    value={postData.carParking}
                    onChange={handleChange}
                    required
                />
                <label
                    htmlFor="floating_carParking"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                    Number Of Car Parking
                </label>
            </div>
        </div>
        <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
            Submit
        </button>
    </form>
);
}

export default EditSellerProperty;
