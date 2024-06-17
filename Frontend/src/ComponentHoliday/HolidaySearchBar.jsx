import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const HolidaySearchBar = ({ selectedLocation, setHoliday }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        if (selectedLocation) {
          const url = import.meta.env.VITE_BASE_URL;
          const response = await axios.get(
            `${url}/holidaypackages/location/${selectedLocation}`
          );
          setHoliday(response.data);
          console.log(response.data);
        }
      } catch (error) {
        console.error("Error fetching holiday packages:", error);
      }
    };

    fetchPackages();
  }, [selectedLocation, setHoliday]);

  const handleSearch = () => {
    navigate(`/holidaypackages/location/${selectedLocation}`);
  };

  const handleLocationChange = (event) => {
    selectedLocation = event.target.value;
  };

  const destinations = [
    { value: "Canada", label: "Canada" },
    { value: "Bhutan", label: "Bhutan" },
    { value: "Switzerland", label: "Switzerland" },
    { value: "France", label: "France" },
    { value: "Greece", label: "Greece" },
    { value: "Abu Dhabi", label: "Abu Dhabi" },
    { value: "Hong kong", label: "Hong kong" },
    { value: "Australia", label: "Australia" },
    { value: "Dubai", label: "Dubai" },
    { value: "South Korea", label: "South Korea" },
    { value: "Mumbai", label: "Mumbai" },
    { value: "Rajasthan", label: "Rajasthan" },
    { value: "Bengaluru", label: "Bengaluru" },
    { value: "Assam", label: "Assam" },
    { value: "Darjeeling", label: "Darjeeling" },
   
  ];

  return (
    <>
      <div className="hidden md:block md:h-16 md:w-[25rem] md:w-5/6 bg-[white] font-poppins md:flex md:justify-around absolute md:px-0 md:py-2.5 md:border-[1px] rounded-xl md:ml-2 md:mt-28 md:mt-28 md:mb-2">
        <div className="md:items-center md:gap-2.5">
          <h1 className="md:ml-[0.3rem] md:font-semibold">Destination</h1>
          <select value={selectedLocation} onChange={handleLocationChange}>
            <option value="">Select Location</option>
            {destinations.map((destination) => (
              <option key={destination.value} value={destination.value}>
                {destination.label}
              </option>
            ))}
          </select>
        </div>
        <div className="headerSearchItem">
          <button
            className="bg-[#90CCBA] hover:bg-[#46c79f] md:text-white md:font-bold md:h-16 md:pl-6 md:pr-6 md:mt-[-0.7rem] md:mr-[-4.5rem] md:border-[1px] md:rounded-r-lg"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>

      {/* mobile view */}

      <div className="md:hidden">
        <div className="bg-white rounded-lg border-[1px] p-4 mt-[12rem]">
          <div className="mb-4">
            <label htmlFor="location" className="text-sm text-gray-500 mb-1 mr-2">
              Destination
            </label>
            <select
              id="location"
              value={selectedLocation}
              onChange={handleLocationChange}
              className="border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Select Location</option>
              {destinations.map((destination) => (
                <option key={destination.value} value={destination.value}>
                  {destination.label}
                </option>
              ))}
            </select>
          </div>
          <button
            type="button"
            className="w-full bg-[#90CCBA] text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>
    </>
  );
};

export default HolidaySearchBar;
