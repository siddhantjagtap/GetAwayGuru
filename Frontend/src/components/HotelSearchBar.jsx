import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const HotelSearchBar = ({
  setHotels,
  selectedLocation: propSelectedLocation,
}) => {
  const optionsRef = useRef(null);
  const checkinRef = useRef(null);
  const checkoutRef = useRef(null);
  const [selectedLocation, setSelectedLocation] = useState(
    propSelectedLocation || ""
  );
  const [checkinDate, setCheckinDate] = useState("");
  const [checkoutDate, setCheckoutDate] = useState("");
  const today = new Date().toISOString().split("T")[0];
  const [options, setOptions] = useState({
    guest: 1,
    room: 1,
  });
  const navigate = useNavigate();

  const handleSearch = () => {
    const guests = options.guest;
    const rooms = options.room;

    navigate(
      `/hotels/location/${selectedLocation}?startDate=${checkinDate}&endDate=${checkoutDate}&guests=${guests}&rooms=${rooms}`
    );
  };

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  const handleOption = (name, operation) => {
    setOptions((prev) => ({
      ...prev,
      [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
    }));
  };

  const [openOptions, setOpenOptions] = useState(false);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        if (selectedLocation) {
          const url = import.meta.env.VITE_BASE_URL;
          const response = await axios.get(
            `${url}/api/hotels/location/${selectedLocation}`
          );
          setHotels(response.data);
        }
      } catch (error) {
        console.error("Error fetching hotels:", error);
      }
    };

    fetchHotels();
  }, [selectedLocation, setHotels]);

  useEffect(() => {
    const savedLocation = localStorage.getItem("selectedLocation");
    const savedCheckinDate = localStorage.getItem("checkinDate");
    const savedCheckoutDate = localStorage.getItem("checkoutDate");
    const savedGuests = localStorage.getItem("guests");
    const savedRooms = localStorage.getItem("rooms");

    if (savedLocation && !propSelectedLocation)
      setSelectedLocation(savedLocation);
    if (savedCheckinDate) setCheckinDate(savedCheckinDate);
    if (savedCheckoutDate) setCheckoutDate(savedCheckoutDate);
    if (savedGuests && savedRooms) {
      setOptions({
        guest: parseInt(savedGuests, 10),
        room: parseInt(savedRooms, 10),
      });
    }
  }, [propSelectedLocation]);

  useEffect(() => {
    localStorage.setItem("selectedLocation", selectedLocation);
    localStorage.setItem("checkinDate", checkinDate);
    localStorage.setItem("checkoutDate", checkoutDate);
    localStorage.setItem("guests", options.guest.toString());
    localStorage.setItem("rooms", options.room.toString());
  }, [selectedLocation, options, checkinDate, checkoutDate]);

  const destinations = [
    { value: "Mumbai", label: "Mumbai" },
    { value: "New Delhi", label: "New Delhi" },
    { value: "Agra", label: "Agra" },
    { value: "Jaipur", label: "Jaipur" },
    { value: "Bengaluru", label: "Bengaluru" },
    { value: "Hyderabad", label: "Hyderabad" },
    { value: "Goa", label: "Goa" },
    { value: "Manali", label: "Manali" },
    { value: "Chennai", label: "Chennai" },
    // { value: "Kerala", label: "Kerala" },
    { value: "Dubai", label: "Dubai" },
    { value: "Bangkok", label: "Bangkok" },
    { value: "Singapore", label: "Singapore" },
    { value: "Phuket", label: "Phuket" },
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
    setCheckinDate(selectedDate);
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
    setCheckoutDate(selectedDate);
  };

  return (
    <>
      {/* Desktop view */}
      <div className="hidden md:flex md:h-16 md:w-full lg:w-5/6 xl:w-2/3 bg-white font-poppins md:justify-around absolute md:px-4 md:py-2.5 md:border-[1px] rounded-xl md:ml-2 md:mt-28 md:mb-2 max-w-screen-xl">
        <div className="md:items-center md:gap-2.5">
          <h1 className="md:ml-[0.3rem] md:font-semibold">Destination</h1>
          <select
            value={selectedLocation}
            onChange={handleLocationChange}
            className="border border-gray-300 rounded-md px-2"
          >
            <option value="">Select Location</option>
            {destinations.map((destination) => (
              <option key={destination.value} value={destination.value}>
                {destination.label}
              </option>
            ))}
          </select>
        </div>

        <div className="headerSearchItem">
          <h1 className="md:ml-8 md:font-semibold">Check-in Date</h1>
          <input
            type="date"
            value={checkinDate}
            ref={checkinRef}
            onChange={handleCheckInDateChange}
            className="md:absolute md:ml-[2rem] md:text-gray-400 md:bold cursor-pointer flex items-center"
          />
        </div>
        <div className="headerSearchItem">
          <h1 className="md:ml-8 md:font-semibold">Check-out Date</h1>
          <input
            type="date"
            value={checkoutDate}
            ref={checkoutRef}
            onChange={handleCheckOutDateChange}
            className="md:absolute md:ml-[2rem] md:text-gray-400 md:bold cursor-pointer flex items-center"
          />
        </div>
        <button
          onClick={handleSearch}
          className="bg-[#90CCBA] hover:bg-[#46c79f] md:text-white md:font-bold md:h-16 md:pl-6 md:pr-6 md:mt-[-0.66rem] md:mr-[-4.5rem] md:border-[1px] md:rounded-r-lg "
        >
          Search
        </button>
      </div>

      {/* Mobile view  */}

      <div className="md:hidden">
        <div className="bg-white rounded-lg border border-gray-300 p-4 mt-[10rem] h-[17rem] w-[21.5rem] md:mt-0 ">
          <div className="mb-4">
            <label
              htmlFor="location"
              className="text-lg text-gray-500 mb-1 mr-2"
            >
              Destination
            </label>
            <select
              id="location"
              value={selectedLocation}
              onChange={handleLocationChange}
              className="border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg text-lg"
            >
              <option value="">Select Location</option>
              {destinations.map((destination) => (
                <option key={destination.value} value={destination.value}>
                  {destination.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-between mb-[2rem]">
            <div>
              <p className="text-lg text-gray-500 mt-2 mb-2">Check-in</p>
              <input
                type="date"
                value={checkinDate}
                ref={checkinRef}
                onChange={handleCheckInDateChange}
                className="bg-white border border-gray-300 rounded-md py-2 px-4 text-lg font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-[9.8rem]"
              />
            </div>
            <div>
              <p className="text-lg text-gray-500 mt-2 mb-2">Check-out</p>
              <input
                type="date"
                ref={checkoutRef}
                value={checkoutDate}
                onChange={handleCheckOutDateChange}
                className="bg-white border border-gray-300 rounded-md py-2 px-4 text-lg font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ml-2 w-[9.8rem]"
              />
            </div>
          </div>

          <button
            onClick={handleSearch}
            type="button"
            className="bg-[#90CCBA] hover:bg-[#46c79f] md:w-full w-[19rem] md:mr-0 text-white font-bold py-2 px-4 rounded-md text-xl"
          >
            Search
          </button>

          {openOptions && (
            <div className="options absolute bg-white shadow-md rounded-xl mt-2">
              {/* For Guest */}
              <div className="optionItem w-22 flex justify-between m-4 pt-2">
                <span className="optionText ">Guest :</span>
                <div className="optionCounter flex items-center gap-2 text-xs text-[black]">
                  <button
                    disabled={options.guest <= 1}
                    className="optionCounterButton w-[30px] h-[30px] ml-2 border text-[#0071c2] cursor-pointer border-solid border-[#0071c2]"
                    onClick={() => handleOption("guest", "d")}
                  >
                    -
                  </button>
                  <span className="optionCounterNumber">{options.guest}</span>
                  <button
                    className="optionCounterButton w-[30px] h-[30px] border text-[#0071c2] cursor-pointer border-solid border-[#0071c2]"
                    onClick={() => handleOption("guest", "i")}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* For Room */}
              <div className="optionItem w-22 flex justify-between m-4 pt-2">
                <span className="optionText">Room :</span>
                <div className="optionCounter flex items-center gap-2 text-xs text-[black]">
                  <button
                    disabled={options.room <= 1}
                    className="optionCounterButton w-[30px] h-[30px] ml-2 border text-[#0071c2] cursor-pointer border-solid border-[#0071c2]"
                    onClick={() => handleOption("room", "d")}
                  >
                    -
                  </button>
                  <span className="optionCounterNumber">{options.room}</span>
                  <button
                    className="optionCounterButton w-[30px] h-[30px] border text-[#0071c2] cursor-pointer border-solid border-[#0071c2]"
                    onClick={() => handleOption("room", "i")}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default HotelSearchBar;

















//old.....
// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { DateRange } from "react-date-range";
// import { format } from "date-fns";
// import axios from "axios";
// import "react-date-range/dist/styles.css"; // main css file for react-date-range
// import "react-date-range/dist/theme/default.css"; // theme css file for react-date-range

// const HotelSearchBar = ({ setHotels, selectedLocation: propSelectedLocation }) => {
//   const [selectedLocation, setSelectedLocation] = useState(propSelectedLocation || '');
//   const [openDate, setOpenDate] = useState(false);
//   const [date, setDate] = useState([
//     {
//       startDate: new Date(),
//       endDate: new Date(),
//       key: "selection",
//     },
//   ]);
//   const [openOptions, setOpenOptions] = useState(false);
//   const [options, setOptions] = useState({
//     guest: 1,
//     room: 1,
//   });
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Fetch hotels based on the selected location
//     const fetchHotels = async () => {
//       try {
//         if (selectedLocation) {
//           const url = import.meta.env.VITE_BASE_URL;
//           const response = await axios.get(`${url}/api/hotels/location/${selectedLocation}`);
//           setHotels(response.data);
//         }
//       } catch (error) {
//         console.error("Error fetching hotels:", error);
//       }
//     };

//     fetchHotels();
//   }, [selectedLocation, setHotels]);

//   useEffect(() => {
//     // Retrieve values from local storage on mount
//     const savedLocation = localStorage.getItem("selectedLocation");
//     const savedStartDate = localStorage.getItem("startDate");
//     const savedEndDate = localStorage.getItem("endDate");
//     const savedGuests = localStorage.getItem("guests");
//     const savedRooms = localStorage.getItem("rooms");

//     if (savedLocation && !propSelectedLocation) setSelectedLocation(savedLocation);
//     if (savedStartDate && savedEndDate) {
//       setDate([
//         {
//           startDate: new Date(savedStartDate),
//           endDate: new Date(savedEndDate),
//           key: "selection",
//         },
//       ]);
//     }
//     if (savedGuests && savedRooms) {
//       setOptions({
//         guest: parseInt(savedGuests, 10),
//         room: parseInt(savedRooms, 10),
//       });
//     }
//   }, [propSelectedLocation]);

//   useEffect(() => {
//     // Save values to local storage whenever they change
//     if (date.length > 0) {
//       localStorage.setItem("selectedLocation", selectedLocation);
//       localStorage.setItem("startDate", format(date[0].startDate, "yyyy-MM-dd"));
//       localStorage.setItem("endDate", format(date[0].endDate, "yyyy-MM-dd"));
//       localStorage.setItem("guests", options.guest.toString());
//       localStorage.setItem("rooms", options.room.toString());
//     }
//   }, [selectedLocation, date, options]);

//   const handleSearch = () => {
//     const startDate = format(date[0].startDate, "yyyy-MM-dd");
//     const endDate = format(date[0].endDate, "yyyy-MM-dd");
//     const guests = options.guest;
//     const rooms = options.room;

//     navigate(`/hotels/location/${selectedLocation}?startDate=${startDate}&endDate=${endDate}&guests=${guests}&rooms=${rooms}`);
//   };

//   const handleLocationChange = (event) => {
//     setSelectedLocation(event.target.value);
//   };

//   const handleOption = (name, operation) => {
//     setOptions((prev) => {
//       return {
//         ...prev,
//         [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
//       };
//     });
//   };

//   const destinations = [
//     { value: "Mumbai", label: "Mumbai" },
//     { value: "New Delhi", label: "New Delhi" },
//     { value: "Agra", label: "Agra" },
//     { value: "Jaipur", label: "Jaipur" },
//     { value: "Bengaluru", label: "Bengaluru" },
//     { value: "Hyderabad", label: "Hyderabad" },
//     { value: "Goa", label: "Goa" },
//     { value: "Manali", label: "Manali" },
//     { value: "Chennai", label: "Chennai" },
//     { value: "Kerala", label: "Kerala" },
//     { value: "Dubai", label: "Dubai" },
//     { value: "Bangkok", label: "Bangkok" },
//     { value: "Singapore", label: "Singapore" },
//     { value: "Phuket", label: "Phuket" },
//   ];

//   return (
//     <>
//       <div className="hidden md:block md:h-16 md:w-5/6 bg-[white] font-poppins md:flex md:justify-around absolute md:px-0 md:py-2.5 md:border-[1px] rounded-xl md:ml-2 md:mt-28 md:mt-28 md:mb-2">
//         {/* Content for desktop view */}
//         <div className="md:items-center md:gap-2.5">
//           <h1 className="md:ml-[0.3rem] md:font-semibold">Destination</h1>
//           <select value={selectedLocation} onChange={handleLocationChange}>
//             <option value="">Select Location</option>
//             {destinations.map((destination) => (
//               <option key={destination.value} value={destination.value}>
//                 {destination.label}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Calendar */}
//         <div className="headerSearchItem">
//           <h1 className="md:ml-8 md:font-semibold">Check-in & Check-out Date</h1>
//           <span
//             onClick={() => setOpenDate(!openDate)}
//             className="headerSearchText md:absolute md:ml-8 md:text-gray-400 md:bold cursor-pointer"
//           >{`${format(date[0].startDate, "dd/MM/yyyy")} to ${format(
//             date[0].endDate,
//             "dd/MM/yyyy"
//           )}`}</span>

//           {openDate && (
//             <DateRange
//               editableDateInputs={true}
//               onChange={(item) => setDate([item.selection])}
//               moveRangeOnFirstSelection={false}
//               ranges={date}
//               className="absolute z-50 mt-[1.5rem]"
//               rangeColors={["#90CCBA"]}
//               showDateDisplay={false}
//             />
//           )}
//         </div>

//         {/* Guest and rooms */}
//         <div className="headerSearchItem font-poppins">
//           <h1 className="md:font-semibold">Rooms & Guest</h1>
//           <span
//             onClick={() => setOpenOptions(!openOptions)}
//             className="headerSearchText md:text-gray-400 md:bold md:cursor-pointer"
//           >{`${options.guest} guest & ${options.room}`}</span>

//           {openOptions && (
//             <div className="options md:absolute md:bg-white md:shadow-md md:rounded-xl md:mt-2">
//               {/* For Guest */}
//               <div className="optionItem w-22 flex justify-between m-4 pt-2">
//                 <span className="optionText ">Guest :</span>
//                 <div className="optionCounter flex items-center gap-2 text-xs text-[black]">
//                   <button
//                     disabled={options.guest <= 1}
//                     className="optionCounterButton md:w-[30px] md:h-[30px] md:ml-2 md:border md:text-[#0071c2] md:cursor-pointer md:border-solid md:border-[#0071c2]"
//                     onClick={() => handleOption("guest", "d")}
//                   >
//                     -
//                   </button>

//                   <span className="optionCounterNumber">{options.guest}</span>

//                   <button
//                     className="optionCounterButton md:w-[30px] md:h-[30px] md:border md:text-[#0071c2] md:cursor-pointer md:border-solid md:border-[#0071c2]"
//                     onClick={() => handleOption("guest", "i")}
//                   >
//                     +
//                   </button>
//                 </div>
//               </div>

//               {/* For Room */}
//               <div className="optionItem md:w-22 md:flex md:justify-between md:m-4 md:pt-2">
//                 <span className="optionText">Room :</span>

//                 <div className="optionCounter flex items-center gap-2 text-xs text-[black]">
//                   <button
//                     disabled={options.room <= 1}
//                     className="optionCounterButton w-[30px] h-[30px] ml-2 border text-[#0071c2] cursor-pointer border-solid border-[#0071c2]"
//                     onClick={() => handleOption("room", "d")}
//                   >
//                     -
//                   </button>

//                   <span className="optionCounterNumber">{options.room}</span>

//                   <button
//                     className="optionCounterButton w-[30px] h-[30px] border text-[#0071c2] cursor-pointer border-solid border-[#0071c2]"
//                     onClick={() => handleOption("room", "i")}
//                   >
//                     +
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//         <button onClick={handleSearch} className="search-button md:bg-[#90CCBA] md:text-white md:font-bold md:h-16 md:pl-6 md:pr-6 md:mt-[-0.7rem] md:mr-[-4.5rem] md:border-[1px] md:rounded-r-lg">Search</button>
//       </div>
//         {/* Mobile view hidden by default */}

// <div className="md:hidden">
//   <div className="bg-white rounded-lg border-[1px] p-4 mt-80">
//     <div className="mb-4">
//       <label htmlFor="location" className="text-sm text-gray-500 mb-1 mr-2">
//         Destination
//       </label>
//       <select
//         id="location"
//         value={selectedLocation}
//         onChange={handleLocationChange}
//         className="border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//       >
//         <option value="">Select Location</option>
//         {destinations.map((destination) => (
//           <option key={destination.value} value={destination.value}>
//             {destination.label}
//           </option>
//         ))}
//       </select>
//     </div>

//     <div className="flex justify-between mb-4">
//       <div>
//         <p className="text-sm text-gray-500">Check-in</p>
//         <button
//           type="button"
//           onClick={() => setOpenDate(!openDate)}
//           className="bg-white border border-gray-300 rounded-md py-2 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//         >
//           {format(date[0].startDate, "dd/MM/yyyy")}
//         </button>
//       </div>
//       <div>
//         <p className="text-sm text-gray-500">Check-out</p>
//         <button
//           type="button"
//           onClick={() => setOpenDate(!openDate)}
//           className="bg-white border border-gray-300 rounded-md py-2 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ml-2"
//         >
//           {format(date[0].endDate, "dd/MM/yyyy")}
//         </button>
//       </div>
//     </div>

//     {/* Calendar */}
//     {openDate && (
//       <div className="md:hidden">
//         <DateRange
//           editableDateInputs={true}
//           onChange={(item) => setDate([item.selection])}
//           moveRangeOnFirstSelection={false}
//           ranges={date}
//           // className="absolute ml-[0.5rem] z-50 w-[20rem] text-sm" /* Adjusted size */
//           className=""
//         />
//       </div>
//     )}

//     <div className="mb-4">
//       <p className="text-sm text-gray-500 mb-1">Room & guests</p>
//       <button
//         type="button"
//         onClick={() => setOpenOptions(!openOptions)}
//         className="w-full bg-white border border-gray-300 rounded-md py-2 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//       >
//         {`${options.guest} guest & ${options.room}`}
//       </button>
//     </div>

//     <button
//       type="button"
//       className="w-full bg-[#90CCBA] text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
//       onClick={handleSearch}
//     >
//       Search
//     </button>

//     {openOptions && (
//       <div className="options absolute bg-white shadow-md rounded-xl mt-2">
//         {/* For Guest */}
//         <div className="optionItem w-22 flex justify-between m-4 pt-2">
//           <span className="optionText ">Guest :</span>
//           <div className="optionCounter flex items-center gap-2 text-xs text-[black]">
//             <button
//               disabled={options.guest <= 1}
//               className="optionCounterButton w-[30px] h-[30px] ml-2 border text-[#0071c2] cursor-pointer border-solid border-[#0071c2]"
//               onClick={() => handleOption("guest", "d")}
//             >
//               -
//             </button>
//             <span className="optionCounterNumber">{options.guest}</span>
//             <button
//               className="optionCounterButton w-[30px] h-[30px] border text-[#0071c2] cursor-pointer border-solid border-[#0071c2]"
//               onClick={() => handleOption("guest", "i")}
//             >
//               +
//             </button>
//           </div>
//         </div>

//         {/* For Room */}
//         <div className="optionItem w-22 flex justify-between m-4 pt-2">
//           <span className="optionText">Room :</span>
//           <div className="optionCounter flex items-center gap-2 text-xs text-[black]">
//             <button
//               disabled={options.room <= 1}
//               className="optionCounterButton w-[30px] h-[30px] ml-2 border text-[#0071c2] cursor-pointer border-solid border-[#0071c2]"
//               onClick={() => handleOption("room", "d")}
//             >
//               -
//             </button>
//             <span className="optionCounterNumber">{options.room}</span>
//             <button
//               className="optionCounterButton w-[30px] h-[30px] border text-[#0071c2] cursor-pointer border-solid border-[#0071c2]"
//               onClick={() => handleOption("room", "i")}
//             >
//               +
//             </button>
//           </div>
//         </div>
//       </div>
//     )}
//   </div>
// </div>

//     </>
//   );
// };

// export default HotelSearchBar;
