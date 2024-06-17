import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaStar, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { ImLocation2 } from "react-icons/im";
import { IoShareSocialSharp } from "react-icons/io5";

const HolidayImgSection = ({ singlePackage }) => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [singlePackage.Img_1, singlePackage.Img_2, singlePackage.Img_3, singlePackage.Img_4, singlePackage.Img_5];

  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div>
      {/* Mobile view */}
      <div className="md:hidden">
        <div className="relative">
          <img
            className="w-full h-64 object-cover"
            src={images[currentImageIndex]}
            alt={singlePackage.Package_Name}
          />
          <div className="absolute inset-0 flex justify-between items-center px-4">
            <FaArrowLeft
              className="text-white text-2xl cursor-pointer"
              onClick={handlePreviousImage}
            />
            <FaArrowRight
              className="text-white text-2xl cursor-pointer"
              onClick={handleNextImage}
            />
          </div>
        </div>
      </div>

      {/* Desktop view */}
      <div className="hidden md:block">
        {/* ... (existing desktop view code) */}
        <div className="flex bg-white-200 ml-[4rem] bg-white-300 w-[70rem]">
      <div className="mt-[1.5rem] ml-[2rem] w-[25rem]">
        <img
          className="rounded mt-2 h-[26rem] object-cover"
          src={singlePackage.Img_1}
          alt={singlePackage.Package_Name}
        />
      </div>

      <div className="flex-direction-column mt-[2rem] ml-[20px] border-1 w-[19rem]">
        <img
          className="rounded w-[18rem] h-[12.5rem]"
          src={singlePackage.Img_2}
          alt=""
        />
        <img
          className="rounded w-[18rem] h-[12.5rem] mt-4"
          src={singlePackage.Img_3}
          alt=""
        />
      </div>

      <div className="flex-direction-column mt-[2rem] w-[19rem]">
        <img
          className="rounded w-[18rem] h-[12.5rem]"
          src={singlePackage.Img_4}
          alt=""
        />
        <div className="mt-4 rounded">
          <img
            className="rounded w-[18rem] h-[12.5rem]"
            src={singlePackage.Img_5}
            alt=""
          />
         
        </div>
       </div>
      </div>
     </div>

      <div className="items-center md:w-[70rem] md:h-full md:ml-[6rem] md:mt-[1rem]">
        <h1 className="text-black md:text-2xl text-2xl mt-2 ml-4 font-bold md:mr-2">
          {singlePackage.Package_Name}
        </h1>
        <div className="flex mt-0 gap-2 ">
            <ImLocation2 className="text-1xl mt-[15px] ml-4" />
            <p className="mt-[10px] ml-[4px]">{singlePackage.Location}</p>
            <IoShareSocialSharp className="text-1xl mt-[15px] ml-2" />
            <p className="cursor-pointer mt-[10px]">share</p>
          </div>
      </div>
      <br />
    </div>
  );
};

export default HolidayImgSection


