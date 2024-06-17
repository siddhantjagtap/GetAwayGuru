import React, { useContext, useEffect, useState } from "react";
import Navbar from "./Navbar";
import { SiPhonepe } from "react-icons/si";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams,useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/Auth_Context";

const CheckoutForm = () => {
  const { hotelName } = useParams();
  const navigate = useNavigate()
  const [roomType, setRoomType] = useState("");
  const [basePrice, setBasePrice] = useState(0); // Base price for a single room with up to 4 guests
  const [hotel, setHotel] = useState(null);
  const [state, setState] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [rooms, setRooms] = useState(1);
  const [guests, setGuests] = useState(1);
  const [orderDate, setOrderDate] = useState("");
  const { user } = useContext(AuthContext);
  const [price, setPrice] = useState(0);
  const [contactNumber, setContactNumber] = useState("");
  const [guestName, setGuestName] = useState("") 
  const [breakfast, setBreakfast] = useState(false); // State for breakfast option
  const today = new Date().toISOString().split('T')[0];
  
  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const url = import.meta.env.VITE_BASE_URL;
        const response = await axios.get(`${url}/api/hotels/${hotelName}`);
        setHotel(response.data);
      } catch (error) {
        console.error("Error fetching hotel details:", error);
      }
    };

    const urlParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlParams.entries());
    setRoomType(params.roomType);
    setBasePrice(parseFloat(params.price));
    setPrice(parseFloat(params.price)); // Set the initial price
    setRooms(parseInt(params.rooms) || 1); // Set the initial number of rooms
    // setGuests(parseInt(params.guests) || 1); // Set the initial number of guests
    fetchHotelDetails();
  }, [hotelName]);


  useEffect(() => {
    // Retrieve values from local storage
    const startDate = localStorage.getItem('checkinDate');
    const endDate = localStorage.getItem('checkoutDate');
    
    // Set the values to the state variables
    setCheckInDate(startDate);
    setCheckOutDate(endDate);
  }, []);
  

  const calculateTotalPrice = (rooms, guests, breakfast) => {
    let totalPrice = basePrice * rooms;

    // Calculate the additional cost for extra guests (more than 4 per room)
    // const extraGuestsPerRoom = Math.max(0, guests - rooms * 4);
    // const additionalCost = extraGuestsPerRoom * (basePrice / 4); // Adjust the additional cost calculation as needed
    // totalPrice += additionalCost;

    // Add breakfast cost if selected
    if (breakfast) {
      totalPrice += 500 * guests;
    }

    return totalPrice;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Invalid email or password. Please try again.", {
        style: {
          backgroundColor: 'red',
          color: 'white'
        },
        position: "top-right",
        autoClose: 3000,
      });
      setTimeout(() => {
        navigate('/login');
      }, 2000); // Delay the navigation to allow the toast message to be shown
      return;
    }
  
    try {
      const url = import.meta.env.VITE_BASE_URL;

      // Capture current date as orderDate
      const currentOrderDate = new Date().toISOString();

    setOrderDate(currentOrderDate);
      // Prepare the order data
      const orderData = {
        Hotel_Name: hotel?.Hotel_Name,
        checkInDate,
        checkOutDate,
        numberOfGuests: guests,
        numberOfRooms: rooms,
        username: user.username,
        email: user.email,
        state: state,
        room_Type: roomType,
        contact_number: contactNumber,
        guestName: guestName,
        breakfast: breakfast, // Include the breakfast option
        amount: price, // Amount in paise (smallest currency unit)
        orderDate: currentOrderDate, // Include orderDate
    
      };
  
      // Create order in the backend
      const response = await axios.post(`${url}/api/hotels/booking`, orderData);
      console.log("ewwww", response.data);
      console.log("data", response.data.hotelBookingDetails);
      if (response.data.hotelBookingDetails) {
        const { amount,razorpayOrderId, key, email, username } = response.data.hotelBookingDetails;
        console.log("hiiewd");
        // Prepare Razorpay options
        const options = {
          key,
          amount,
          currency: 'INR',
          name: "GetAwayGuru Booking",
          description: 'Hotel Booking Payment',
          order_id: razorpayOrderId,
          handler: async function (response) {
            const body = {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            };
  
            // Validate payment
            const validateRes = await axios.post(`${url}/api/order/validate`, body);
  
            if (validateRes.data.msg === 'success') {
              const token = localStorage.getItem('token');
              localStorage.clear();
              if (token) {
                localStorage.setItem('token', token);
              }
              toast.success('Payment successful');
              navigate(`/thankyou/${response.razorpay_order_id}`);
            } else {
              toast.error('Payment validation failed');
              navigate(`/checkout/${hotelName}`);
            }
          },
          prefill: {
            name: username,
            email: email,
            contact: contactNumber,
          },
          notes: {
            address: `${hotel?.Hotel_Name}, ${state}`,
          },
          theme: {
            color: '#3399cc',
          },
        };
  
        // Initialize Razorpay payment
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
      }
    } catch (error) {
      console.error("Error in order creation or payment initiation:", error);
      navigate(`/checkout/${hotelName}`);
    }
  };
  

  const handleRoomsChange = (value) => {
    value = Math.max(value, 1);
    setRooms(value);
    // Calculate the base price for a single room
    const basePricePerRoom = basePrice;
    // Recalculate the total price based on the original base price when one room is selected
    const totalPrice = value === 1 ? basePricePerRoom : basePricePerRoom * value;
    setPrice(totalPrice);
  };
  
  const handleGuestsChange = (value) => {
    // Calculate the maximum number of guests based on the current number of rooms
    const maxGuests = rooms * 3; // Assuming a maximum of 3 guests per room

    // Check if the value exceeds the maximum number of guests
    if (value > maxGuests) {
      // If it exceeds, set the value to the maximum number of guests
      value = maxGuests;
    }

    // Update the state with the new number of guests
    setGuests(value);

   
  };

  const handleBreakfastChange = (value) => {
    setBreakfast(value);
    setPrice(calculateTotalPrice(rooms, guests, value));
  };

  const statesList = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa",
    "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala",
    "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland",
    "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
    "Uttar Pradesh", "Uttarakhand", "West Bengal"
  ];

  const handleCheckInDateChange = (e) => {
    const selectedDate = e.target.value;

    // Check if the selected date is before the current date
    if (selectedDate < today) {
      // If it is, don't update the state and show an alert
      alert("You cannot select a date before the current date.");
      return;
    }

    // Otherwise, update the state with the selected date
    setCheckInDate(selectedDate);
  };

  const handleCheckOutDateChange = (e) => {
    const selectedDate = e.target.value;

    // Check if the selected date is before the current date
    if (selectedDate < today) {
      // If it is, don't update the state and show an alert
      alert("You cannot select a date before the current date.");
      return;
    }

    // Otherwise, update the state with the selected date
    setCheckOutDate(selectedDate);
  };

  return (
    <>
      <Navbar />

      {/* Mobile View Summery Box */}
      <div className="font-poppins md:hidden m-4">
        <div className="border border-gray-300 rounded-2xl pl-4 mb-4">
          <h3 className="font-bold mb-4 text-2xl mt-4">Summary</h3>
          <div className="flex">
            <img
              src={hotel?.Image_1}
              alt="Hotel"
              className="w-26 h-20 object-cover rounded "
            />
            <h1 className="px-4 text-lg font-bold">{hotel?.Hotel_Name}</h1>
          </div>
          <div className="px-2 py-2 text-mx font-semibold">
            <div className="mb-2">Room : {roomType}</div>
            <div className="mb-2">Check in: {checkInDate}</div>
            <div className="mb-2">Check out: {checkOutDate}</div>
            <div className="mb-2">No. of rooms: {rooms}</div>
            <div className="mb-2">No. of guest: {guests}</div>
            <div className="mb-2">Breakfast: {breakfast ? "Yes" : "No"}</div>
            <div className="border-t border-gray-300 pt-2 font-bold text-lg mb-2 mr-2">
        Price: {price}
      </div>
          </div>
        </div>
      </div>

      {/* Customer details Form */}
      <h1 className="font-poppins ml-[7rem] text-xl font-semibold mt-[1rem] mb-2">
        Customer Details
      </h1>
    
      <div className="font-poppins md:ml-[10rem] flex mt-[1rem]">
       <div className="flex-initial md:m-[2px] m-[1rem] w-[35rem] size-22">
         <div className="flex flex-col mb-4">
              <label htmlFor="name" className="mb-2 font-semibold">Whom are you booking for?</label>
              <input 
                  type="text" id="name"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)} 
                  placeholder="Enter the guest's name" 
                  className="border border-gray-300 p-2 rounded-md" />
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col">
            <div className="flex flex-col lg:flex-row mb-2">
              <div className="mb-4 lg:mr-4 flex-auto">
                <label htmlFor="number" className="block text-base font-semibold mb-2">
                  Contact No: 
                </label>
                <input
                  type="tel"
                  id="number"
                  placeholder="Phone No"
                  pattern="[0-9]{10}"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  className="border border-gray-300 rounded-md px-4 py-2 w-full"
                />
              </div>
              <div className="mb-4 lg:mb-0 flex-auto">
                <label htmlFor="state" className="block text-base font-semibold mb-2">
                  State
                </label>
                <select
                  id="state"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="border border-gray-300 rounded-md px-4 py-2 w-full"
                >
                  <option value="">Select State</option>
                  {statesList.map((stateName, index) => (
                    <option key={index} value={stateName}>
                      {stateName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {/* Other Form Fields */}
            <div className="flex flex-col lg:flex-row mb-2">
              <div className="mb-4 lg:mr-4 flex-auto">
                <label
                  htmlFor="checkInDate"
                  className="block text-base font-semibold mb-2"
                >
                  Check in date
                </label>
                <input
                  type="date"
                  id="checkInDate"
                  value={checkInDate}
                  onChange={handleCheckInDateChange}
                  min={today}
                  className="border border-gray-300 rounded-md px-4 py-2 w-full"
                />
              </div>
              <div className="mb-4 lg:mb-0 flex-auto">
                <label
                  htmlFor="checkOutDate"
                  className="block text-base font-semibold mb-2"
                >
                  Checkout date
                </label>
                <input
                  type="date"
                  id="checkOutDate"
                  min={today}
                  value={checkOutDate}
                  onChange={handleCheckOutDateChange}
                  className="border border-gray-300 rounded-md px-4 py-2 w-full"
                />
              </div>
            </div>

            {/* room and guest */}

            <div className="flex flex-col lg:flex-row mb-4">
              <div className="mb-4 lg:mr-4 flex-auto">
                <label
                  htmlFor="room"
                  className="block text-base font-semibold mb-2"
                >
                  Rooms
                </label>
                <input
                  type="number"
                  id="room"
                  placeholder="Room"
                  value={rooms}
                  onChange={(e) => handleRoomsChange(parseInt(e.target.value))}
                  className="border border-gray-300 rounded-md px-4 py-2 w-full"
                />
              </div>

              <div className="mb-4 lg:mb-0 flex-auto">
                <label
                  htmlFor="guest"
                  className="block text-base font-semibold mb-2"
                >
                  Guest
                </label>
                <input
                  type="number"
                  id="guest"
                  placeholder="Guest"
                  value={guests}
                  onChange={(e) => handleGuestsChange(parseInt(e.target.value))}
                  className="border border-gray-300 rounded-md px-4 py-2 w-full"
                />
              </div>
            </div>

            {/* Breakfast Option */}
            <div className="mb-[0.9rem] flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="withBreakfast"
                  checked={breakfast}
                  onChange={() => handleBreakfastChange(true)}
                  className="w-4 h-4 py-3 text-blue-600 bg-gray-100 rounded border-gray-300"
                />
                <label
                  htmlFor="withBreakfast"
                  className="ml-2 flex items-center text-lg font-medium text-fuchsia-900"
                >
                  With Breakfast (+500 Rs per guest)
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="withoutBreakfast"
                  checked={!breakfast}
                  onChange={() => handleBreakfastChange(false)}
                  className="w-4 h-4 py-3 text-blue-600 bg-gray-100 rounded border-gray-300"
                />
                <label
                  htmlFor="withoutBreakfast"
                  className="ml-2 flex items-center text-lg font-medium text-fuchsia-900"
                >
                  Without Breakfast
                </label>
              </div>
            </div>

            <div className="mb-[0.9rem] flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="radio"
                  checked="checked"
                  className="w-4 h-4 py-3 text-blue-600 bg-gray-100 rounded border-gray-300"
                />
                <label
                  htmlFor="default-checkbox"
                  className="ml-2 flex items-center text-lg font-medium text-fuchsia-900"
                >
                  {/* <SiPhonepe className="text-2xl" />
                  <span className="ml-1">Phone Pe</span> */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="100" height="30" fill="#072654" viewBox="0 0 1896 401" id="razorpay"><path fill="#3395FF" d="m122.63 105.7-15.75 57.97 90.15-58.3-58.96 219.98 59.88.05L285.05.48"></path><path d="M25.6 232.92.8 325.4h122.73l50.22-188.13L25.6 232.92m426.32-81.42c-3 11.15-8.78 19.34-17.4 24.57-8.6 5.22-20.67 7.84-36.25 7.84h-49.5l17.38-64.8h49.5c15.56 0 26.25 2.6 32.05 7.9 5.8 5.3 7.2 13.4 4.22 24.6m51.25-1.4c6.3-23.4 3.7-41.4-7.82-54-11.5-12.5-31.68-18.8-60.48-18.8H324.4l-66.5 248.1h53.67l26.8-100h35.2c7.9 0 14.12 1.3 18.66 3.8 4.55 2.6 7.22 7.1 8.04 13.6l9.58 82.6h57.5l-9.32-77c-1.9-17.2-9.77-27.3-23.6-30.3 17.63-5.1 32.4-13.6 44.3-25.4a92.6 92.6 0 0 0 24.44-42.5m130.46 86.4c-4.5 16.8-11.4 29.5-20.73 38.4-9.34 8.9-20.5 13.3-33.52 13.3-13.26 0-22.25-4.3-27-13-4.76-8.7-4.92-21.3-.5-37.8 4.42-16.5 11.47-29.4 21.17-38.7 9.7-9.3 21.04-13.95 34.06-13.95 13 0 21.9 4.5 26.4 13.43 4.6 8.97 4.7 21.8.2 38.5zm23.52-87.8-6.72 25.1c-2.9-9-8.53-16.2-16.85-21.6-8.34-5.3-18.66-8-30.97-8-15.1 0-29.6 3.9-43.5 11.7-13.9 7.8-26.1 18.8-36.5 33-10.4 14.2-18 30.3-22.9 48.4-4.8 18.2-5.8 34.1-2.9 47.9 3 13.9 9.3 24.5 19 31.9 9.8 7.5 22.3 11.2 37.6 11.2a82.4 82.4 0 0 0 35.2-7.7 82.11 82.11 0 0 0 28.4-21.2l-7 26.16h51.9L709.3 149h-52zm238.65 0H744.87l-10.55 39.4h87.82l-116.1 100.3-9.92 37h155.8l10.55-39.4h-94.1l117.88-101.8m142.4 52c-4.67 17.4-11.6 30.48-20.75 39-9.15 8.6-20.23 12.9-33.24 12.9-27.2 0-36.14-17.3-26.86-51.9 4.6-17.2 11.56-30.13 20.86-38.84 9.3-8.74 20.57-13.1 33.82-13.1 13 0 21.78 4.33 26.3 13.05 4.52 8.7 4.48 21.67-.13 38.87m30.38-80.83c-11.95-7.44-27.2-11.16-45.8-11.16-18.83 0-36.26 3.7-52.3 11.1a113.09 113.09 0 0 0-41 32.06c-11.3 13.9-19.43 30.2-24.42 48.8-4.9 18.53-5.5 34.8-1.7 48.73 3.8 13.9 11.8 24.6 23.8 32 12.1 7.46 27.5 11.17 46.4 11.17 18.6 0 35.9-3.74 51.8-11.18 15.9-7.48 29.5-18.1 40.8-32.1 11.3-13.94 19.4-30.2 24.4-48.8 5-18.6 5.6-34.84 1.8-48.8-3.8-13.9-11.7-24.6-23.6-32.05m185.1 40.8 13.3-48.1c-4.5-2.3-10.4-3.5-17.8-3.5-11.9 0-23.3 2.94-34.3 8.9-9.46 5.06-17.5 12.2-24.3 21.14l6.9-25.9-15.07.06h-37l-47.7 176.7h52.63l24.75-92.37c3.6-13.43 10.08-24 19.43-31.5 9.3-7.53 20.9-11.3 34.9-11.3 8.6 0 16.6 1.97 24.2 5.9m146.5 41.1c-4.5 16.5-11.3 29.1-20.6 37.8-9.3 8.74-20.5 13.1-33.5 13.1s-21.9-4.4-26.6-13.2c-4.8-8.85-4.9-21.6-.4-38.36 4.5-16.75 11.4-29.6 20.9-38.5 9.5-8.97 20.7-13.45 33.7-13.45 12.8 0 21.4 4.6 26 13.9 4.6 9.3 4.7 22.2.28 38.7m36.8-81.4c-9.75-7.8-22.2-11.7-37.3-11.7-13.23 0-25.84 3-37.8 9.06-11.95 6.05-21.65 14.3-29.1 24.74l.18-1.2 8.83-28.1h-51.4l-13.1 48.9-.4 1.7-54 201.44h52.7l27.2-101.4c2.7 9.02 8.2 16.1 16.6 21.22 8.4 5.1 18.77 7.63 31.1 7.63 15.3 0 29.9-3.7 43.75-11.1 13.9-7.42 25.9-18.1 36.1-31.9 10.2-13.8 17.77-29.8 22.6-47.9 4.9-18.13 5.9-34.3 3.1-48.45-2.85-14.17-9.16-25.14-18.9-32.9m174.65 80.65c-4.5 16.7-11.4 29.5-20.7 38.3-9.3 8.86-20.5 13.27-33.5 13.27-13.3 0-22.3-4.3-27-13-4.8-8.7-4.9-21.3-.5-37.8 4.4-16.5 11.42-29.4 21.12-38.7 9.7-9.3 21.05-13.94 34.07-13.94 13 0 21.8 4.5 26.4 13.4 4.6 8.93 4.63 21.76.15 38.5zm23.5-87.85-6.73 25.1c-2.9-9.05-8.5-16.25-16.8-21.6-8.4-5.34-18.7-8-31-8-15.1 0-29.68 3.9-43.6 11.7-13.9 7.8-26.1 18.74-36.5 32.9-10.4 14.16-18 30.3-22.9 48.4-4.85 18.17-5.8 34.1-2.9 47.96 2.93 13.8 9.24 24.46 19 31.9 9.74 7.4 22.3 11.14 37.6 11.14 12.3 0 24.05-2.56 35.2-7.7a82.3 82.3 0 0 0 28.33-21.23l-7 26.18h51.9l47.38-176.7h-51.9zm269.87.06.03-.05h-31.9c-1.02 0-1.92.05-2.85.07h-16.55l-8.5 11.8-2.1 2.8-.9 1.4-67.25 93.68-13.9-109.7h-55.08l27.9 166.7-61.6 85.3h54.9l14.9-21.13c.42-.62.8-1.14 1.3-1.8l17.4-24.7.5-.7 77.93-110.5 65.7-93 .1-.06h-.03z"></path></svg>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-[#90CCBA] hover:bg-[#46c79f] text-white font-bold py-2 px-4 rounded mb-[4rem]"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </form>
        </div>

        {/* Desktop View For Summary Box */}
        <div className="md:ml-[4rem] mb-4 md:flex hidden w-[25rem] h-[25rem]">
          <div className="border border-gray-300 rounded-2xl pl-4">
            <h3 className="font-bold mb-4 text-2xl mt-4">Summary</h3>
            <div className="flex">
              <img
                src={hotel?.Image_1}
                alt="Hotel"
                className="w-26 h-20 object-cover rounded "
              />
              <h1 className="px-4 text-lg font-bold">{hotel?.Hotel_Name}</h1>
            </div>
            <div className="px-2 py-2 text-mx font-semibold">
              <div className="mb-2">Room : {roomType}</div>
              <div className="mb-2">Check in: {checkInDate}</div>
              <div className="mb-2">Check out: {checkOutDate}</div>
              <div className="mb-2">No. of rooms: {rooms}</div>
              <div className="mb-2">No. of guest: {guests}</div>
              <div className="mb-2">Breakfast: {breakfast ? "Yes" : "No"}</div>
              <div className="border-t border-gray-300 pt-2 font-bold text-lg mb-2 mr-2">
        Price: {price}
      </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default CheckoutForm;


























//finall
// import React, { useContext, useEffect, useState } from "react";
// import Navbar from "./Navbar";
// import { SiPhonepe } from "react-icons/si";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useParams,useNavigate } from "react-router-dom";
// import { AuthContext } from "../Context/Auth_Context";

// const CheckoutForm = () => {
//   const { hotelName } = useParams();
//   const navigate = useNavigate()
//   const [roomType, setRoomType] = useState("");
//   const [basePrice, setBasePrice] = useState(0); // Base price for a single room with up to 4 guests
//   const [hotel, setHotel] = useState(null);
//   const [state, setState] = useState("");
//   const [checkInDate, setCheckInDate] = useState("");
//   const [checkOutDate, setCheckOutDate] = useState("");
//   const [rooms, setRooms] = useState(1);
//   const [guests, setGuests] = useState(1);
//   const [orderDate, setOrderDate] = useState("");
//   const { user } = useContext(AuthContext);
//   const [price, setPrice] = useState(0);
//   const [contactNumber, setContactNumber] = useState("");
//   const [guestName, setGuestName] = useState("") 
//   const [breakfast, setBreakfast] = useState(false); // State for breakfast option
//   const today = new Date().toISOString().split('T')[0];
  
//   useEffect(() => {
//     const fetchHotelDetails = async () => {
//       try {
//         const url = import.meta.env.VITE_BASE_URL;
//         const response = await axios.get(`${url}/api/hotels/${hotelName}`);
//         setHotel(response.data);
//       } catch (error) {
//         console.error("Error fetching hotel details:", error);
//       }
//     };

//     const urlParams = new URLSearchParams(window.location.search);
//     const params = Object.fromEntries(urlParams.entries());
//     setRoomType(params.roomType);
//     setBasePrice(parseFloat(params.price));
//     setPrice(parseFloat(params.price)); // Set the initial price
//     setRooms(parseInt(params.rooms) || 1); // Set the initial number of rooms
//     // setGuests(parseInt(params.guests) || 1); // Set the initial number of guests
//     fetchHotelDetails();
//   }, [hotelName]);


//   useEffect(() => {
//     // Retrieve values from local storage
//     const startDate = localStorage.getItem('checkinDate');
//     const endDate = localStorage.getItem('checkoutDate');
    
//     // Set the values to the state variables
//     setCheckInDate(startDate);
//     setCheckOutDate(endDate);
//   }, []);
  

//   const calculateTotalPrice = (rooms, guests, breakfast) => {
//     let totalPrice = basePrice * rooms;

//     // Calculate the additional cost for extra guests (more than 4 per room)
//     // const extraGuestsPerRoom = Math.max(0, guests - rooms * 4);
//     // const additionalCost = extraGuestsPerRoom * (basePrice / 4); // Adjust the additional cost calculation as needed
//     // totalPrice += additionalCost;

//     // Add breakfast cost if selected
//     if (breakfast) {
//       totalPrice += 500 * guests;
//     }

//     return totalPrice;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!user) {
//       toast.info('Please log in to proceed with the payment.');
//       setTimeout(() => {
//         navigate('/login');
//       }, 2000); // Delay the navigation to allow the toast message to be shown
//       return;
//     }
  
//     try {
//       const url = import.meta.env.VITE_BASE_URL;

//       // Capture current date as orderDate
//       const currentOrderDate = new Date().toISOString();

//     setOrderDate(currentOrderDate);
//       // Prepare the order data
//       const orderData = {
//         Hotel_Name: hotel?.Hotel_Name,
//         checkInDate,
//         checkOutDate,
//         numberOfGuests: guests,
//         numberOfRooms: rooms,
//         username: user.username,
//         email: user.email,
//         state: state,
//         room_Type: roomType,
//         contact_number: contactNumber,
//         guestName: guestName,
//         breakfast: breakfast, // Include the breakfast option
//         amount: price, // Amount in paise (smallest currency unit)
//         orderDate: currentOrderDate, // Include orderDate
    
//       };
  
//       // Create order in the backend
//       const response = await axios.post(`${url}/api/hotels/booking`, orderData);
//       console.log("ewwww", response.data);
//       console.log("data", response.data.hotelBookingDetails);
//       if (response.data.hotelBookingDetails) {
//         const { amount,razorpayOrderId, key, email, username } = response.data.hotelBookingDetails;
//         console.log("hiiewd");
//         // Prepare Razorpay options
//         const options = {
//           key,
//           amount,
//           currency: 'INR',
//           name: "GetAwayGuru Booking",
//           description: 'Hotel Booking Payment',
//           order_id: razorpayOrderId,
//           handler: async function (response) {
//             const body = {
//               razorpay_order_id: response.razorpay_order_id,
//               razorpay_payment_id: response.razorpay_payment_id,
//               razorpay_signature: response.razorpay_signature,
//             };
  
//             // Validate payment
//             const validateRes = await axios.post(`${url}/api/order/validate`, body);
  
//             if (validateRes.data.msg === 'success') {
//               toast.success('Payment successful');
//               navigate(`/thankyou/${response.razorpay_order_id}`);
//             } else {
//               toast.error('Payment validation failed');
//               navigate(`/checkout/${hotelName}`);
//             }
//           },
//           prefill: {
//             name: username,
//             email: email,
//             contact: contactNumber,
//           },
//           notes: {
//             address: `${hotel?.Hotel_Name}, ${state}`,
//           },
//           theme: {
//             color: '#3399cc',
//           },
//         };
  
//         // Initialize Razorpay payment
//         const rzp1 = new window.Razorpay(options);
//         rzp1.open();
//       }
//     } catch (error) {
//       console.error("Error in order creation or payment initiation:", error);
//       navigate(`/checkout/${hotelName}`);
//     }
//   };
  

//   const handleRoomsChange = (value) => {
//     value = Math.max(value, 1);
//     setRooms(value);
//     setPrice(calculateTotalPrice(value, guests, breakfast));
//   };

//   const handleGuestsChange = (value) => {
//     // Calculate the maximum number of guests based on the current number of rooms
//     const maxGuests = rooms * 3; // Assuming a maximum of 3 guests per room

//     // Check if the value exceeds the maximum number of guests
//     if (value > maxGuests) {
//       // If it exceeds, set the value to the maximum number of guests
//       value = maxGuests;
//     }

//     // Update the state with the new number of guests
//     setGuests(value);

   
//   };

//   const handleBreakfastChange = (value) => {
//     setBreakfast(value);
//     setPrice(calculateTotalPrice(rooms, guests, value));
//   };

//   const statesList = [
//     "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa",
//     "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala",
//     "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland",
//     "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
//     "Uttar Pradesh", "Uttarakhand", "West Bengal"
//   ];

//   const handleCheckInDateChange = (e) => {
//     const selectedDate = e.target.value;

//     // Check if the selected date is before the current date
//     if (selectedDate < today) {
//       // If it is, don't update the state and show an alert
//       alert("You cannot select a date before the current date.");
//       return;
//     }

//     // Otherwise, update the state with the selected date
//     setCheckInDate(selectedDate);
//   };

//   const handleCheckOutDateChange = (e) => {
//     const selectedDate = e.target.value;

//     // Check if the selected date is before the current date
//     if (selectedDate < today) {
//       // If it is, don't update the state and show an alert
//       alert("You cannot select a date before the current date.");
//       return;
//     }

//     // Otherwise, update the state with the selected date
//     setCheckOutDate(selectedDate);
//   };

//   return (
//     <>
//       <Navbar />

//       {/* Mobile View Summery Box */}
//       <div className="font-poppins md:hidden m-4">
//         <div className="border border-gray-300 rounded-2xl pl-4 mb-4">
//           <h3 className="font-bold mb-4 text-2xl mt-4">Summary</h3>
//           <div className="flex">
//             <img
//               src={hotel?.Image_1}
//               alt="Hotel"
//               className="w-26 h-20 object-cover rounded "
//             />
//             <h1 className="px-4 text-lg font-bold">{hotel?.Hotel_Name}</h1>
//           </div>
//           <div className="px-2 py-2 text-mx font-semibold">
//             <div className="mb-2">Room : {roomType}</div>
//             <div className="mb-2">Check in: {checkInDate}</div>
//             <div className="mb-2">Check out: {checkOutDate}</div>
//             <div className="mb-2">No. of rooms: {rooms}</div>
//             <div className="mb-2">No. of guest: {guests}</div>
//             <div className="mb-2">Breakfast: {breakfast ? "Yes" : "No"}</div>
//             <div className="font-bold text-lg mb-2">Price: {price}</div>
//           </div>
//         </div>
//       </div>

//       {/* Customer details Form */}
//       <h1 className="font-poppins ml-[7rem] text-xl font-semibold mt-[1rem] mb-2">
//         Customer Details
//       </h1>
    
//       <div className="font-poppins md:ml-[10rem] flex mt-[1rem]">
//        <div className="flex-initial md:m-[2px] m-[1rem] w-[35rem] size-22">
//          <div className="flex flex-col mb-4">
//               <label htmlFor="name" className="mb-2 font-semibold">Whom are you booking for?</label>
//               <input 
//                   type="text" id="name"
//                   value={guestName}
//                   onChange={(e) => setGuestName(e.target.value)} 
//                   placeholder="Enter the guest's name" 
//                   className="border border-gray-300 p-2 rounded-md" />
//           </div>
//           <form onSubmit={handleSubmit} className="flex flex-col">
//             <div className="flex flex-col lg:flex-row mb-2">
//               <div className="mb-4 lg:mr-4 flex-auto">
//                 <label htmlFor="number" className="block text-base font-semibold mb-2">
//                   Contact No: 
//                 </label>
//                 <input
//                   type="tel"
//                   id="number"
//                   placeholder="Phone No"
//                   pattern="[0-9]{10}"
//                   value={contactNumber}
//                   onChange={(e) => setContactNumber(e.target.value)}
//                   className="border border-gray-300 rounded-md px-4 py-2 w-full"
//                 />
//               </div>
//               <div className="mb-4 lg:mb-0 flex-auto">
//                 <label htmlFor="state" className="block text-base font-semibold mb-2">
//                   State
//                 </label>
//                 <select
//                   id="state"
//                   value={state}
//                   onChange={(e) => setState(e.target.value)}
//                   className="border border-gray-300 rounded-md px-4 py-2 w-full"
//                 >
//                   <option value="">Select State</option>
//                   {statesList.map((stateName, index) => (
//                     <option key={index} value={stateName}>
//                       {stateName}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//             {/* Other Form Fields */}
//             <div className="flex flex-col lg:flex-row mb-2">
//               <div className="mb-4 lg:mr-4 flex-auto">
//                 <label
//                   htmlFor="checkInDate"
//                   className="block text-base font-semibold mb-2"
//                 >
//                   Check in date
//                 </label>
//                 <input
//                   type="date"
//                   id="checkInDate"
//                   value={checkInDate}
//                   onChange={handleCheckInDateChange}
//                   min={today}
//                   className="border border-gray-300 rounded-md px-4 py-2 w-full"
//                 />
//               </div>
//               <div className="mb-4 lg:mb-0 flex-auto">
//                 <label
//                   htmlFor="checkOutDate"
//                   className="block text-base font-semibold mb-2"
//                 >
//                   Checkout date
//                 </label>
//                 <input
//                   type="date"
//                   id="checkOutDate"
//                   min={today}
//                   value={checkOutDate}
//                   onChange={handleCheckOutDateChange}
//                   className="border border-gray-300 rounded-md px-4 py-2 w-full"
//                 />
//               </div>
//             </div>

//             {/* room and guest */}

//             <div className="flex flex-col lg:flex-row mb-4">
//               <div className="mb-4 lg:mr-4 flex-auto">
//                 <label
//                   htmlFor="room"
//                   className="block text-base font-semibold mb-2"
//                 >
//                   Rooms
//                 </label>
//                 <input
//                   type="number"
//                   id="room"
//                   placeholder="Room"
//                   value={rooms}
//                   onChange={(e) => handleRoomsChange(parseInt(e.target.value))}
//                   className="border border-gray-300 rounded-md px-4 py-2 w-full"
//                 />
//               </div>

//               <div className="mb-4 lg:mb-0 flex-auto">
//                 <label
//                   htmlFor="guest"
//                   className="block text-base font-semibold mb-2"
//                 >
//                   Guest
//                 </label>
//                 <input
//                   type="number"
//                   id="guest"
//                   placeholder="Guest"
//                   value={guests}
//                   onChange={(e) => handleGuestsChange(parseInt(e.target.value))}
//                   className="border border-gray-300 rounded-md px-4 py-2 w-full"
//                 />
//               </div>
//             </div>

//             {/* Breakfast Option */}
//             <div className="mb-[0.9rem] flex items-center justify-between">
//               <div className="flex items-center">
//                 <input
//                   type="radio"
//                   id="withBreakfast"
//                   checked={breakfast}
//                   onChange={() => handleBreakfastChange(true)}
//                   className="w-4 h-4 py-3 text-blue-600 bg-gray-100 rounded border-gray-300"
//                 />
//                 <label
//                   htmlFor="withBreakfast"
//                   className="ml-2 flex items-center text-lg font-medium text-fuchsia-900"
//                 >
//                   With Breakfast (+500 Rs per guest)
//                 </label>
//               </div>
//               <div className="flex items-center">
//                 <input
//                   type="radio"
//                   id="withoutBreakfast"
//                   checked={!breakfast}
//                   onChange={() => handleBreakfastChange(false)}
//                   className="w-4 h-4 py-3 text-blue-600 bg-gray-100 rounded border-gray-300"
//                 />
//                 <label
//                   htmlFor="withoutBreakfast"
//                   className="ml-2 flex items-center text-lg font-medium text-fuchsia-900"
//                 >
//                   Without Breakfast
//                 </label>
//               </div>
//             </div>

//             <div className="mb-[0.9rem] flex items-center justify-between">
//               <div className="flex items-center">
//                 <input
//                   type="radio"
//                   checked="checked"
//                   className="w-4 h-4 py-3 text-blue-600 bg-gray-100 rounded border-gray-300"
//                 />
//                 <label
//                   htmlFor="default-checkbox"
//                   className="ml-2 flex items-center text-lg font-medium text-fuchsia-900"
//                 >
//                   {/* <SiPhonepe className="text-2xl" />
//                   <span className="ml-1">Phone Pe</span> */}
//                   <svg xmlns="http://www.w3.org/2000/svg" width="100" height="30" fill="#072654" viewBox="0 0 1896 401" id="razorpay"><path fill="#3395FF" d="m122.63 105.7-15.75 57.97 90.15-58.3-58.96 219.98 59.88.05L285.05.48"></path><path d="M25.6 232.92.8 325.4h122.73l50.22-188.13L25.6 232.92m426.32-81.42c-3 11.15-8.78 19.34-17.4 24.57-8.6 5.22-20.67 7.84-36.25 7.84h-49.5l17.38-64.8h49.5c15.56 0 26.25 2.6 32.05 7.9 5.8 5.3 7.2 13.4 4.22 24.6m51.25-1.4c6.3-23.4 3.7-41.4-7.82-54-11.5-12.5-31.68-18.8-60.48-18.8H324.4l-66.5 248.1h53.67l26.8-100h35.2c7.9 0 14.12 1.3 18.66 3.8 4.55 2.6 7.22 7.1 8.04 13.6l9.58 82.6h57.5l-9.32-77c-1.9-17.2-9.77-27.3-23.6-30.3 17.63-5.1 32.4-13.6 44.3-25.4a92.6 92.6 0 0 0 24.44-42.5m130.46 86.4c-4.5 16.8-11.4 29.5-20.73 38.4-9.34 8.9-20.5 13.3-33.52 13.3-13.26 0-22.25-4.3-27-13-4.76-8.7-4.92-21.3-.5-37.8 4.42-16.5 11.47-29.4 21.17-38.7 9.7-9.3 21.04-13.95 34.06-13.95 13 0 21.9 4.5 26.4 13.43 4.6 8.97 4.7 21.8.2 38.5zm23.52-87.8-6.72 25.1c-2.9-9-8.53-16.2-16.85-21.6-8.34-5.3-18.66-8-30.97-8-15.1 0-29.6 3.9-43.5 11.7-13.9 7.8-26.1 18.8-36.5 33-10.4 14.2-18 30.3-22.9 48.4-4.8 18.2-5.8 34.1-2.9 47.9 3 13.9 9.3 24.5 19 31.9 9.8 7.5 22.3 11.2 37.6 11.2a82.4 82.4 0 0 0 35.2-7.7 82.11 82.11 0 0 0 28.4-21.2l-7 26.16h51.9L709.3 149h-52zm238.65 0H744.87l-10.55 39.4h87.82l-116.1 100.3-9.92 37h155.8l10.55-39.4h-94.1l117.88-101.8m142.4 52c-4.67 17.4-11.6 30.48-20.75 39-9.15 8.6-20.23 12.9-33.24 12.9-27.2 0-36.14-17.3-26.86-51.9 4.6-17.2 11.56-30.13 20.86-38.84 9.3-8.74 20.57-13.1 33.82-13.1 13 0 21.78 4.33 26.3 13.05 4.52 8.7 4.48 21.67-.13 38.87m30.38-80.83c-11.95-7.44-27.2-11.16-45.8-11.16-18.83 0-36.26 3.7-52.3 11.1a113.09 113.09 0 0 0-41 32.06c-11.3 13.9-19.43 30.2-24.42 48.8-4.9 18.53-5.5 34.8-1.7 48.73 3.8 13.9 11.8 24.6 23.8 32 12.1 7.46 27.5 11.17 46.4 11.17 18.6 0 35.9-3.74 51.8-11.18 15.9-7.48 29.5-18.1 40.8-32.1 11.3-13.94 19.4-30.2 24.4-48.8 5-18.6 5.6-34.84 1.8-48.8-3.8-13.9-11.7-24.6-23.6-32.05m185.1 40.8 13.3-48.1c-4.5-2.3-10.4-3.5-17.8-3.5-11.9 0-23.3 2.94-34.3 8.9-9.46 5.06-17.5 12.2-24.3 21.14l6.9-25.9-15.07.06h-37l-47.7 176.7h52.63l24.75-92.37c3.6-13.43 10.08-24 19.43-31.5 9.3-7.53 20.9-11.3 34.9-11.3 8.6 0 16.6 1.97 24.2 5.9m146.5 41.1c-4.5 16.5-11.3 29.1-20.6 37.8-9.3 8.74-20.5 13.1-33.5 13.1s-21.9-4.4-26.6-13.2c-4.8-8.85-4.9-21.6-.4-38.36 4.5-16.75 11.4-29.6 20.9-38.5 9.5-8.97 20.7-13.45 33.7-13.45 12.8 0 21.4 4.6 26 13.9 4.6 9.3 4.7 22.2.28 38.7m36.8-81.4c-9.75-7.8-22.2-11.7-37.3-11.7-13.23 0-25.84 3-37.8 9.06-11.95 6.05-21.65 14.3-29.1 24.74l.18-1.2 8.83-28.1h-51.4l-13.1 48.9-.4 1.7-54 201.44h52.7l27.2-101.4c2.7 9.02 8.2 16.1 16.6 21.22 8.4 5.1 18.77 7.63 31.1 7.63 15.3 0 29.9-3.7 43.75-11.1 13.9-7.42 25.9-18.1 36.1-31.9 10.2-13.8 17.77-29.8 22.6-47.9 4.9-18.13 5.9-34.3 3.1-48.45-2.85-14.17-9.16-25.14-18.9-32.9m174.65 80.65c-4.5 16.7-11.4 29.5-20.7 38.3-9.3 8.86-20.5 13.27-33.5 13.27-13.3 0-22.3-4.3-27-13-4.8-8.7-4.9-21.3-.5-37.8 4.4-16.5 11.42-29.4 21.12-38.7 9.7-9.3 21.05-13.94 34.07-13.94 13 0 21.8 4.5 26.4 13.4 4.6 8.93 4.63 21.76.15 38.5zm23.5-87.85-6.73 25.1c-2.9-9.05-8.5-16.25-16.8-21.6-8.4-5.34-18.7-8-31-8-15.1 0-29.68 3.9-43.6 11.7-13.9 7.8-26.1 18.74-36.5 32.9-10.4 14.16-18 30.3-22.9 48.4-4.85 18.17-5.8 34.1-2.9 47.96 2.93 13.8 9.24 24.46 19 31.9 9.74 7.4 22.3 11.14 37.6 11.14 12.3 0 24.05-2.56 35.2-7.7a82.3 82.3 0 0 0 28.33-21.23l-7 26.18h51.9l47.38-176.7h-51.9zm269.87.06.03-.05h-31.9c-1.02 0-1.92.05-2.85.07h-16.55l-8.5 11.8-2.1 2.8-.9 1.4-67.25 93.68-13.9-109.7h-55.08l27.9 166.7-61.6 85.3h54.9l14.9-21.13c.42-.62.8-1.14 1.3-1.8l17.4-24.7.5-.7 77.93-110.5 65.7-93 .1-.06h-.03z"></path></svg>
//                 </label>
//               </div>
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               className="bg-[#90CCBA] hover:bg-[#46c79f] text-white font-bold py-2 px-4 rounded mb-[4rem]"
//               onClick={handleSubmit}
//             >
//               Submit
//             </button>
//           </form>
//         </div>

//         {/* Desktop View For Summary Box */}
//         <div className="md:ml-[4rem] mb-4 md:flex hidden w-[25rem] h-[25rem]">
//           <div className="border border-gray-300 rounded-2xl pl-4">
//             <h3 className="font-bold mb-4 text-2xl mt-4">Summary</h3>
//             <div className="flex">
//               <img
//                 src={hotel?.Image_1}
//                 alt="Hotel"
//                 className="w-26 h-20 object-cover rounded "
//               />
//               <h1 className="px-4 text-lg font-bold">{hotel?.Hotel_Name}</h1>
//             </div>
//             <div className="px-2 py-2 text-mx font-semibold">
//               <div className="mb-2">Room : {roomType}</div>
//               <div className="mb-2">Check in: {checkInDate}</div>
//               <div className="mb-2">Check out: {checkOutDate}</div>
//               <div className="mb-2">No. of rooms: {rooms}</div>
//               <div className="mb-2">No. of guest: {guests}</div>
//               <div className="mb-2">Breakfast: {breakfast ? "Yes" : "No"}</div>
//               <div className="font-bold text-lg mb-2">Price: {price}</div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <ToastContainer />
//     </>
//   );
// };

// export default CheckoutForm;
























// import React, { useContext, useEffect, useState } from "react";
// import Navbar from "./Navbar";
// import { SiPhonepe } from "react-icons/si";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import { AuthContext } from "../Context/Auth_Context";

// const CheckoutForm = () => {
//   const { hotelName } = useParams();
//   const [roomType, setRoomType] = useState("");
//   const [basePrice, setBasePrice] = useState(0); // Base price for a single room with up to 4 guests
//   const [hotel, setHotel] = useState(null);
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [pincode, setPincode] = useState("");
//   const [state, setState] = useState("");
//   const [checkInDate, setCheckInDate] = useState("");
//   const [checkOutDate, setCheckOutDate] = useState("");
//   const [rooms, setRooms] = useState(1);
//   const [guests, setGuests] = useState(1);
//   const { user } = useContext(AuthContext);
//   const [price, setPrice] = useState(0);
//   const [contact_number, setContact_number] = useState("")

//   useEffect(() => {
//     const fetchHotelDetails = async () => {

//       try {
//         const url = import.meta.env.VITE_BASE_URL;
//         const response = await axios.get(`${url}/api/hotels/${hotelName}`);
//         setHotel(response.data);
//       } catch (error) {
//         console.error("Error fetching hotel details:", error);
//       }
//     };

//     const urlParams = new URLSearchParams(window.location.search);
//     const params = Object.fromEntries(urlParams.entries());
//     setRoomType(params.roomType);
//     setBasePrice(parseFloat(params.price));
//     setPrice(parseFloat(params.price)); // Set the initial price
//     setRooms(parseInt(params.rooms) || 1); // Set the initial number of rooms
//     setGuests(parseInt(params.guests) || 1); // Set the initial number of guests
//     fetchHotelDetails();
//   }, [hotelName]);

//   const calculateTotalPrice = (rooms, guests) => {
//     let totalPrice = basePrice * rooms;
  
//     // Calculate the additional cost for extra guests (more than 4 per room)
//     const extraGuestsPerRoom = Math.max(0, guests - rooms * 4);
//     const additionalCost = extraGuestsPerRoom * (basePrice / 4); // Adjust the additional cost calculation as needed
  
//     totalPrice += additionalCost;
  
//     return totalPrice;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // Handle form submission logic here
//     try {
//       const url = import.meta.env.VITE_BASE_URL;
//       const response = await axios.post(`${url}/api/booking/createorder`, {
//         Hotel_Name: hotel?.Hotel_Name,
//         checkInDate,
//         checkOutDate,
//         numberOfGuests: guests,
//         numberOfRooms: rooms,
//         username: user.username,
//         email: user.email,
//         state: state,
//         room_Type: roomType,
//         pincode,
//         price: price, // Use the calculated total price
//       });

//       console.log("Order created successfully:", response.data);
//       setOrderSuccess(true); // Set orderSuccess to true on successful order creation
//     } catch (error) {
//       console.error("Error creating order:", error);
//     }
//   };

//   const handleRoomsChange = (value) => {
//     // Prevent setting rooms to a value less than 1
//     value = Math.max(value, 1);
//     setRooms(value);
//     setPrice(calculateTotalPrice(value, guests));
//   };
  
//   const handleGuestsChange = (value) => {
//     // Prevent setting guests to a value less than 1
//     value = Math.max(value, 1);
//     setGuests(value);
//     setPrice(calculateTotalPrice(rooms, value));
//   };
  
//   const statesList = [
//     "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa",
//     "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala",
//     "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland",
//     "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
//     "Uttar Pradesh", "Uttarakhand", "West Bengal"
//   ];

//   return (
//     <>
//       <Navbar />

//       {/* Mobile View Summery Box */}
//       <div className="font-poppins md:hidden">
//         <div className="border border-gray-300 rounded-2xl pl-4 mb-4">
//           <h3 className="font-bold mb-4 text-2xl mt-4">Summary</h3>
//           <div className="flex">
//             <img
//               src={hotel?.Image_1}
//               alt="Hotel"
//               className="w-26 h-20 object-cover rounded "
//             />
//             <h1 className="px-4 text-lg font-bold">{hotel?.Hotel_Name}</h1>
//           </div>
//           <div className="px-2 py-2 text-mx font-semibold">
//             <div className="mb-2">Room : {roomType}</div>
//             <div className="mb-2">Check in: {checkInDate}</div>
//             <div className="mb-2">Check out: {checkOutDate}</div>
//             <div className="mb-2">No. of rooms: {rooms}</div>
//             <div className="mb-2">No. of guest: {guests}</div>
//             <div className="font-bold text-lg mb-2">Price: {price}</div>
//           </div> 
//         </div>
//         </div>
     

//       {/* Customer details Form */}
//       <h1 className="font-poppins ml-[7rem] text-xl font-semibold mt-10 mb-2">
//         Customer Details
//       </h1>
//       <div className="font-poppins md:ml-[10rem] flex mt-[1rem]">
//         <div className="flex-initial md:m-[2px] m-[1rem] w-[35rem] size-22">
//           <form onSubmit={handleSubmit} className="flex flex-col">
//             <div className="flex flex-col lg:flex-row mb-2">
//               <div className="mb-4 lg:mr-4 flex-auto">
//                 <label htmlFor="number" className="block text-base font-semibold mb-2">
//                   Contact No: 
//                 </label>
//                 <input
//                   type="tel"
//                   id="number"
//                   placeholder="Phone No"
//                   pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
//                   value={contact_number}
//                   onChange={(e) => setContact_number(e.target.value)}
//                   className="border border-gray-300 rounded-md px-4 py-2 w-full"
//                 />
//               </div>
//               <div className="mb-4 lg:mb-0 flex-auto">
//                 <label htmlFor="state" className="block text-base font-semibold mb-2">
//                   State
//                 </label>
//                 <select
//                   id="state"
//                   value={state}
//                   onChange={(e) => setState(e.target.value)}
//                   className="border border-gray-300 rounded-md px-4 py-2 w-full"
//                 >
//                   <option value="">Select State</option>
//                   {statesList.map((stateName, index) => (
//                     <option key={index} value={stateName}>
//                       {stateName}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//             {/* Other Form Fields */}
//             <div className="flex flex-col lg:flex-row mb-2">
//               <div className="mb-4 lg:mr-4 flex-auto">
//                 <label
//                   htmlFor="checkInDate"
//                   className="block text-base font-semibold mb-2"
//                 >
//                   Check in date
//                 </label>
//                 <input
//                   type="date"
//                   id="checkInDate"
//                   value={checkInDate}
//                   onChange={(e) => setCheckInDate(e.target.value)}
//                   className="border border-gray-300 rounded-md px-4 py-2 w-full"
//                 />
//               </div>
//               <div className="mb-4 lg:mb-0 flex-auto">
//                 <label
//                   htmlFor="checkOutDate"
//                   className="block text-base font-semibold mb-2"
//                 >
//                   Checkout date
//                 </label>
//                 <input
//                   type="date"
//                   id="checkOutDate"
//                   value={checkOutDate}
//                   onChange={(e) => setCheckOutDate(e.target.value)}
//                   className="border border-gray-300 rounded-md px-4 py-2 w-full"
//                 />
//               </div>
//             </div>

//             {/* room and guest */}

//             <div className="flex flex-col lg:flex-row mb-4">
//               <div className="mb-4 lg:mr-4 flex-auto">
//                 <label
//                   htmlFor="room"
//                   className="block text-base font-semibold mb-2"
//                 >
//                   Rooms
//                 </label>
//                 <input
//                   type="number"
//                   id="room"
//                   placeholder="Room"
//                   // value={quantity}
//                   // onChange={(e) => setQuantity(parseInt(e.target.value))}
                
//                   value={rooms}
//                   onChange={(e) => handleRoomsChange(parseInt(e.target.value))}
//                   className="border border-gray-300 rounded-md px-4 py-2 w-full"
//                   />
                
//               </div>

//               <div className="mb-4 lg:mb-0 flex-auto">
//                 <label
//                   htmlFor="guest"
//                   className="block text-base font-semibold mb-2"
//                 >
//                   Guest
//                 </label>
//                 <input
//                   type="number"
//                   id="guest"
//                   placeholder="Guest"
//                   value={guests}
//                   onChange={(e) => handleGuestsChange(parseInt(e.target.value))}
//                   className="border border-gray-300 rounded-md px-4 py-2 w-full"
//                 />
//               </div>
//             </div>

//             <div className="mb-[0.9rem] flex items-center justify-between">
//               <div className="flex items-center">
//                 <input
//                   type="radio"
//                   checked="checked"
//                   className="w-4 h-4 py-3 text-blue-600 bg-gray-100 rounded border-gray-300"
//                 />
//                 <label
//                   htmlFor="default-checkbox"
//                   className="ml-2 flex items-center text-lg font-medium text-fuchsia-900"
//                 >
//                   <SiPhonepe className="text-2xl" />
//                   <span className="ml-1">Phone Pe</span>
//                 </label>
//               </div>
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               className="bg-[#90CCBA] text-white font-bold py-2 px-4 rounded"
//               onClick={handleSubmit}
//             >
//               Submit
//             </button>
//           </form>
//         </div>

//       {/* Desktop View For Summary Box */}
//       <div className="md:ml-[4rem] mb-4 md:flex hidden w-[25rem] h-[23rem]  ">
//         {/* Summary Box Content */}
//         <div className="border border-gray-300 rounded-2xl pl-4">
//             <h3 className="font-bold mb-4 text-2xl mt-4">Summary</h3>
//             <div className="flex">
//               <img
//                 src={hotel?.Image_1}
//                 alt="Hotel"
//                 className="w-26 h-20 object-cover rounded "
//               />
//               <h1 className="px-4 text-lg font-bold">{hotel?.Hotel_Name}</h1>
//             </div>
//             <div className="px-2 py-2 text-mx font-semibold">
//               <div className="mb-2">Room : {roomType}</div>
//               <div className="mb-2">Check in: {checkInDate}</div>
//               <div className="mb-2">Check out: {checkOutDate}</div>
//               <div className="mb-2">No. of rooms: {rooms}</div>
//               <div className="mb-2">No. of guest: {guests}</div>
//               <div className="font-bold text-lg mb-2">Price: {price}</div>
//               {/* <div className="font-bold text-lg mb-2">Price: {calculateTotalPrice()}</div> */}
//             </div>
//           </div>
//       </div>
//       </div>

//     </>
//   );
// };

// export default CheckoutForm;

