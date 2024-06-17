import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaStar, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { ImLocation2 } from "react-icons/im";
import { IoShareSocialSharp } from "react-icons/io5";

const ImgLoad = ({ hotel }) => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [hotel.Image_1, hotel.Image_2, hotel.Image_3, hotel.Image_4, hotel.Image_5];

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
            alt={hotel.Hotel_Name}
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
          src={hotel.Image_1}
          alt={hotel.Hotel_Name}
        />
      </div>

      <div className="flex-direction-column mt-[2rem] ml-[20px] border-1 w-[19rem]">
        <img
          className="rounded w-[18rem] h-[12.5rem]"
          src={hotel.Image_2}
          alt=""
        />
        <img
          className="rounded w-[18rem] h-[12.5rem] mt-4"
          src={hotel.Image_3}
          alt=""
        />
      </div>

      <div className="flex-direction-column mt-[2rem] w-[19rem]">
        <img
          className="rounded w-[18rem] h-[12.5rem]"
          src={hotel.Image_4}
          alt=""
        />
        <div className="mt-4 rounded">
          <img
            className="rounded w-[18rem] h-[12.5rem]"
            src={hotel.Image_5}
            alt=""
          />
         
        </div>
       </div>
      </div>
     </div>

      <div className="items-center md:w-[70rem] md:h-full md:ml-[6rem] md:mt-[1rem]">
        <h1 className="text-black md:text-2xl text-2xl mt-2 font-bold md:mr-2">
          {hotel.Hotel_Name}
        </h1>
        <div className="flex justify-normal gap-2">
          {[...Array(hotel.Staring_Rating)].map((_, index) => {
            const currentRating = index + 1;
            return (
              <label key={index}>
                <FaStar
                  size={12}
                  className={`text-yellow-500 cursor-pointer mt-4 ${
                    currentRating <= (hover || rating)
                      ? "text-yellow-500"
                      : "text-gray-400"
                  }`}
                  onMouseEnter={() => setHover(currentRating)}
                  onMouseLeave={() => setHover(null)}
                />
              </label>
            );
          })}
          <p className="mt-[10px]">{hotel.Staring_Rating}/5</p>
          <div className="flex mt-0 gap-2 ">
            <ImLocation2 className="text-1xl mt-[15px] " />
            <p className="mt-[10px] ml-[5px]">{hotel.Location}</p>
            <IoShareSocialSharp className="text-1xl mt-[15px] " />
            <p className="cursor-pointer mt-[10px]">share</p>
          </div>
        </div>
      </div>
      <br />
    </div>
  );
};

export default ImgLoad;

