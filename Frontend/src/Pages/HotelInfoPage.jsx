import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ImgLoad from "../components/ImgLoad";
import InfoSection from "../components/InfoSection";
import RoomCard from "../components/RoomCard";
import Policies from "../components/Policies";
import axios from "axios";
import { useParams } from "react-router-dom";
import ReviewSection from "../components/ReviewSection";
import Loading from "../components/Loading";  // Import the Loading component

const HotelInfoPage = () => {
  const { hotelName } = useParams();
  const [hotel, setHotel] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [guests, setGuests] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        setLoading(true);
        const url = import.meta.env.VITE_BASE_URL;
        const response = await axios.get(`${url}/api/hotels/${hotelName}`);
        setHotel(response.data);
        setLoading(false);  // Set loading to false after fetching the data
      } catch (error) {
        console.error('Error fetching hotel details:', error);
        setLoading(false);  // Also set loading to false in case of an error
      }
    };
    fetchHotelDetails();
  }, [hotelName]);
  

  if (loading) {
    return <Loading />;  // Show the loading spinner while data is being fetched
  }

  return (
    <>
      <div className="sticky top-0 bg-white w-full h-[4rem] shadow-lg z-50">
        <Navbar />
      </div>
      <div className="m-[0.7rem] ">
        {hotel && (
          <>
            <ImgLoad hotel={hotel} />
            <InfoSection selectedRoom={selectedRoom} hotel={hotel} guests={guests} />
            <RoomCard hotel={hotel} setSelectedRoom={setSelectedRoom} />
            <Policies hotel={hotel} />
          </>
        )}
      </div>
      <ReviewSection />
      {/* <Footer /> */}
    </>
  );
};

export default HotelInfoPage;
