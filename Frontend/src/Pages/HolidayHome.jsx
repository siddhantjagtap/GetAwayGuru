import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Speciality from '../components/Speciality';
import { useParams } from "react-router-dom";
import Footer from '../components/Footer';
import HolidaySearchBar from '../ComponentHoliday/HolidaySearchBar';
import TopHolidayPackages from '../ComponentHoliday/TopHolidayPackages';
// import SingleHolidayPage from '../ComponentHoliday/SingleHolidayPage';
import bgimg from "../assets/img/HolidayHome.png"
import HolidayFandQ from '../ComponentHoliday/HolidayFandQ';

function HolidayHome() {
  const { selectedLocation } = useParams();
  const [holiday, setHoliday] = useState([]);
  
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center md:h-[32rem] h-[15rem] md:mb-0 mb-12 ">
        <img
          src={bgimg}
          alt="Holiday Image"
          className="hidden md:block md:pl-2 md:pr-2 md:w-[82rem] md:h-[32rem]"
        />
        <h1 className="absolute md:text-3xl font-bold md:mt-12 md:mb-52 md:text-amber-50 italic text-mx text-center mt-16 mb-48 text-black"
          style={{ fontFamily: "cursive" }}>
          Explore Your Dream Destinations with Our Exclusive Holiday Packages
        </h1>
        <p className="absolute md:text-2xl font-bold md:mt-[4rem] md:mb-28 md:ml-[24rem] md:mr-[22rem] md:text-amber-50 text-[0.81rem] text-center font-bold mt-[12rem] mb-48 ml-8 mr-8 text-black italic"
          style={{ fontFamily: "cursive" }}>
          Discover Unforgettable Getaways Tailored Just for You
        </p>
        <HolidaySearchBar selectedLocation={selectedLocation} setHoliday={setHoliday} />
      </div>
      {/* <HolidayList holiday={holiday} /> Render HolidayList with holiday data */}
      {/* <SingleHolidayPage holiday={holiday}/> */}
      <TopHolidayPackages selectedLocation={selectedLocation} setHoliday={setHoliday} />
      <Speciality />
      <HolidayFandQ />
      {/* <Footer /> */}
    </>
  );
}

export default HolidayHome;
