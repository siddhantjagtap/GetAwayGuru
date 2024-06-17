import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import HolidayList from "../ComponentHoliday/HolidayList";
import axios from "axios"; // Import axios
import Loading from "../components/Loading"; // Import the Loading component

const Holidays = () => {
  const { selectedLocation } = useParams();
  const [holiday, setHoliday] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchHolidayPackages = async () => {
      try {
        setLoading(true); // Set loading to true before fetching data
        if (selectedLocation) {
          const url = import.meta.env.VITE_BASE_URL;
          const response = await axios.get(`${url}/api/holidaypackages/location/${selectedLocation}`);
          setHoliday(response.data); // Set holiday state with response.data
          setLoading(false); // Set loading to false after fetching data
        }
      } catch (error) {
        console.error("Error fetching holiday packages:", error);
        setLoading(false); // Also set loading to false in case of an error
      }
    };

    fetchHolidayPackages();
  }, [selectedLocation]);

  if (loading) {
    return <Loading />; // Show the loading spinner while data is being fetched
  }

  return (
    <>
      <Navbar />
      <HolidayList holiday={holiday} />
    </>
  );
};

export default Holidays;
