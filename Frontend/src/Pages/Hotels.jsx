import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Layout from "../components/Layout";
import HotelList from "../components/HotelList";
import Filters from "../components/Filters";
import axios from "axios";
import Loading from "../components/Loading"; // Import the Loading component

const Hotels = () => {
  const { selectedLocation } = useParams();
  const [hotels, setHotels] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [guests, setGuests] = useState(1);
  const [rooms, setRooms] = useState(1);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    // Retrieve values from local storage on mount
    const savedStartDate = localStorage.getItem("startDate");
    const savedEndDate = localStorage.getItem("endDate");
    const savedGuests = localStorage.getItem("guests");
    const savedRooms = localStorage.getItem("rooms");

    if (savedStartDate && savedEndDate) {
      setStartDate(savedStartDate);
      setEndDate(savedEndDate);
    }
    if (savedGuests) setGuests(parseInt(savedGuests, 10));
    if (savedRooms) setRooms(parseInt(savedRooms, 10));
  }, []);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        setLoading(true); // Set loading to true before fetching data
        if (selectedLocation) {
          const url = import.meta.env.VITE_BASE_URL;
          const response = await axios.get(`${url}/api/hotels/location/${selectedLocation}`, {
            params: {
              startDate,
              endDate,
              guests,
              rooms
            }
          });
          setHotels(response.data);
          setLoading(false); // Set loading to false after fetching data
        }
      } catch (error) {
        console.error("Error fetching hotels:", error);
        setLoading(false); // Also set loading to false in case of an error
      }
    };

    fetchHotels();
  }, [selectedLocation, startDate, endDate, guests, rooms]);

  // Function to handle setting filters
  const handleFiltersChange = (filteredHotels) => {
    setHotels(filteredHotels);
  };

  if (loading) {
    return <Loading />; // Show the loading spinner while data is being fetched
  }

  return (
    <>
      <div className="sticky bg-white top-0 md:h-[5rem] z-50">
        <Navbar />
      </div>
      {/* <Layout> */}
        {/* <Filters setFilters={handleFiltersChange} hotels={hotels} /> */}
        <HotelList key="hotelList" hotels={hotels} />
      {/* </Layout> */}

    </>
  );
};

export default Hotels;




