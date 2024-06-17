import React, { useEffect, useState } from "react";
import { ImLocation2 } from "react-icons/im";
import { IoShareSocialSharp } from "react-icons/io5";
import { MdOutlineSportsBar } from "react-icons/md";
import { TbSwimming } from "react-icons/tb";
import { CgGym } from "react-icons/cg";
import { FaWifi } from "react-icons/fa";
import { MdOutlineDinnerDining } from "react-icons/md";
import { MdRoomService } from "react-icons/md";
import { MdSportsBar } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import AboutUsPopup from "./AboutUsPopup";

const InfoSection = ({ selectedRoom, hotel, guests }) => {
  const { hotelName } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(hotel?.Type2_Price);
  const [showPopup, setShowPopup] = useState(false);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
    // setGuests(guests + 1); // Update guests when incrementing quantity
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      // setGuests(guests - 1); // Update guests when decrementing quantity
    }
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handlePrice = () => {
    let totalPrice = 0;
    if (selectedRoom) {
      totalPrice = selectedRoom.price * quantity;
    }
    setPrice(totalPrice);
  };

  useEffect(() => {
    handlePrice();
  }, [selectedRoom, quantity]);

  useEffect(() => {
    console.log("Price updated:", price);
  }, [price]);

  return (
    <div>
      {/* Desktop view */}
      <div className="hidden md:flex w-[60rem] ml-[6rem]">
        {/* About us */}
        <div>
          <h1 className="text-black text-2xl font-bold mr-2 mb-2">About Us</h1>
          {showPopup ? (
            <AboutUsPopup
              aboutUs={hotel.About_Us}
              onClose={togglePopup}
              className="indent-40"
            />
          ) : (
            <>
              <p>{hotel.About_Us.slice(0, 120)}...</p>{" "}
              {/* Display first 120 characters */}
              <button onClick={togglePopup} className="text-blue-600 font-semibold">
                Read More
              </button>
            </>
          )}
        </div>

        {/* Desktop view Total price card */}
        <div className="border shadow-sm h-[17rem] p-5 ml-[2rem] mt-4 w-[25rem]">
          <h1 className="card-title text-2xl font-semibold">
            {selectedRoom?.roomType === "Room_Type_1" ? "Deluxe Room" : "Standard Room"}
          </h1>
          <p className="text-black mt-3 text-xl mb-2 font-extrabold">
            ₹{selectedRoom ? selectedRoom.price : hotel.Type2_Price}
          </p>

          <p className="mt-5">Per night for {quantity} room</p>

          <p className="text-xl font-semibold mt-3">Total Price: ₹{price}</p>
          <br />

          <Link
            to={`/checkout/${hotelName}?roomType=${
              selectedRoom?.roomType === "Room_Type_1" ? "Deluxe Room" : "Standard Room"
            }&price=${price}&rooms=${quantity}`}
          >
            <button
              className="text-white font-bold w-80 h-10 mb-4 rounded bg-[#90CCBA] hover:bg-[#46c79f]"
              
            >
              Reserve Now
            </button>
          </Link>

        </div>
      </div>

      {/* Mobile view */}
    
      <div className="md:hidden">
        <div className="hidden flex md:block ">
          <h1 className="text-black text-2xl font-bold mr-2">About Us</h1>
          {/* Here is the code for About hotel */}
          {hotel.About_Us}
        </div>

        {/*Mobile view Total price card  */}

        <div className="border shadow-lg h-auto pl-[2rem] pt-[1rem] mt-[1rem] w-[20rem] mx-auto mb-4">
          <h1 className="card-title text-2xl font-semibold">
            {selectedRoom?.roomType === "Room_Type_1" ? "Deluxe Room" : "Standard Room"}
          </h1>
          <p className="text-black mt-3 text-xl mb-2 font-extrabold">₹{selectedRoom ? selectedRoom.price : hotel.Type2_Price}</p>

          <p className="mt-5 text-2xl">Per night for {quantity} room</p>

          {/* <div className="flex items-center mt-4 text-2xl">
            <button onClick={handleDecrement} onChange={handlePrice}>-</button>
            <span className="mx-2">{quantity}</span>
            <button onClick={handleIncrement} onChange={handlePrice}>+</button>
          </div> */}

          <p className="text-xl font-semibold mt-3">Total Price: ₹{price}</p>
          <br />
          <Link
            to={`/checkout/${hotelName}?roomType=${
              selectedRoom?.roomType === "Room_Type_1" ? "Deluxe Room" : "Standard Room"
            }&price=${price}`}
          >
            <button className="text-white text-xl font-bold w-[16rem] h-12 mb-4 rounded" style={{ backgroundColor: "#90CCBA" }}>
              Reserve Now
             </button>
          </Link>
          </div>
      </div>
    </div>
  );
};

export default InfoSection;
