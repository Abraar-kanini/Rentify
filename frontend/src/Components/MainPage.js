import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import PropertyCards from './PropertyCards';
import Pagiantion from './Pagiantion';

function MainPage() {
  const [displayProperty, setDisplayProperty] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All categories');
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await fetch("https://rentifyappservice.azurewebsites.net/api/Property", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        let data = await response.json();
        setDisplayProperty(data);
      } catch (error) {
        console.error("Fetch error: ", error);
      }
    };

    fetchData();
  }, []);

  const recordsPerPage = 2;

  // Filter the properties based on the search term
  const filteredProperties = displayProperty.filter((property) => {
    if (selectedCategory === "Rent") {
      return (
        search === "" ||
        property.rentPerMonth.toString().toLowerCase().includes(search.toLowerCase())
      );
    } else if (selectedCategory === "Address") {
      return (
        search === "" ||
        property.address.toLowerCase().includes(search.toLowerCase())
      );
    } else if (selectedCategory === "Car Parking") {
      return (
        search === "" ||
        property.carParking.toString().toLowerCase().includes(search.toLowerCase())
      );
    } else {
      // Default to no filtering if no category is selected
      return true;
    }
  });
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = filteredProperties.slice(firstIndex, lastIndex);
  const nPage = Math.ceil(filteredProperties.length / recordsPerPage);
  const numbers = [...Array(nPage + 1).keys()].slice(1);

  const handlePage = (n) => {
    setCurrentPage(n);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setIsDropdownOpen(false);
    setSearch(""); // Reset search when category changes
  };
  

  const handleSearch = (event) => {
    setSearch(event.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  return (
    <>
      <Navbar />
      <form className="max-w-lg mx-auto">
        <div className="flex relative">
          <label htmlFor="search-dropdown" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
          <button
            id="dropdown-button"
            type="button"
            className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
            onClick={toggleDropdown}
          >
            {selectedCategory}
            <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
            </svg>
          </button>
          {isDropdownOpen && (
  <div id="dropdown" className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 top-full mt-2">
    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">
      <li>
        <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => handleCategorySelect('Rent')}>Rent</button>
      </li>
      <li>
        <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => handleCategorySelect('Address')}>Address</button>
      </li>
      <li>
        <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => handleCategorySelect('Car Parking')}>Car Parking</button>
      </li>
    </ul>
  </div>
)}

          <div className="relative w-full">
            <input
              type="search"
              id="search-dropdown"
              className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
              placeholder="Search Mockups, Logos, Design Templates..."
              required onChange={handleSearch}
            />
            <button
              type="submit"
              className="absolute top-0 right-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
              <span className="sr-only">Search</span>
            </button>
          </div>
        </div>
      </form>

      <div className='w-[95vw] flex items-center m-auto'>
        <PropertyCards properties={records} inputSearch={search} />
      </div>
      <Pagiantion numbers={numbers} handlePage={handlePage} currentPage={currentPage} />
    </>
  );
}

export default MainPage;
