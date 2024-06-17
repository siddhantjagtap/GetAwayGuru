import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { useParams } from "react-router-dom";
import HolidayImgSection from "../ComponentHoliday/HolidayImgSection";
import HolidayAboutAndBox from "../ComponentHoliday/HolidayAboutAndBox";
import HolidayDayPackage from "../ComponentHoliday/HolidayDayPackage";
import Loading from "../components/Loading"; // Import the Loading component

const HolidayInfoPage = () => {
  const { packageName } = useParams();
  const [singlePackage, setSinglePackage] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchHolidayDetails = async () => {
      try {
        setLoading(true); // Set loading to true before fetching data
        const url = import.meta.env.VITE_BASE_URL;
        const response = await axios.get(`${url}/api/holidaypackages/${encodeURIComponent(packageName)}`);
        setSinglePackage(response.data);
        setLoading(false); // Set loading to false after fetching data
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching holiday details:', error);
        setLoading(false); // Also set loading to false in case of an error
      }
    };
    fetchHolidayDetails();
  }, [packageName]);

  if (loading) {
    return <Loading />; // Show the loading spinner while data is being fetched
  }

  return (
    <>
      <div className="sticky top-0 bg-white w-full h-[4rem] shadow-lg z-50">
        <Navbar />
      </div>
      <div className="m-[0.7rem] ">
        {singlePackage && (
          <>
            <HolidayImgSection singlePackage={singlePackage} />
            <HolidayAboutAndBox singlePackage={singlePackage} />
            <HolidayDayPackage singlePackage={singlePackage} />
          </>
        )}
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default HolidayInfoPage;
