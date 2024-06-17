import React, { useState } from "react";
import HolidayAboutPopup from './HolidayAboutPopUp';
import {Link ,useParams} from "react-router-dom";

function HolidayAboutAndBox({ singlePackage }) {
  const [showPopup, setShowPopup] = useState(false);
  const { packageName } = useParams();
  const [price, setPrice] = useState(singlePackage.Price);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className="flex flex-col lg:flex-row justify-between w-full lg:w-[73rem] mx-4 lg:mx-6">
      <div className="w-full lg:w-[70rem] pr-4 lg:ml-[4.3rem] mb-4 lg:mb-0">
        <h1 className="text-black text-2xl font-bold mr-2 mb-2">Package Overview</h1>
        {showPopup ? (
          <HolidayAboutPopup
            aboutUs={singlePackage.Overview}
            onClose={togglePopup}
            className="indent-40"
          />
        ) : (
          <>
            <p>{singlePackage.Overview.slice(0, 120)}...</p> {/* Display first 120 characters */}
            <button onClick={togglePopup} className="text-blue-600 font-semibold">
              Read More
            </button>
          </>
        )}
      </div>

      <div className="w-[20rem] lg:w-[25rem] h-auto lg:h-[11rem] bg-white border rounded-lg p-4 shadow-lg">
        <h2 className="text-black text-xl font-bold mb-2">{singlePackage.Package_Name}</h2>
        {/* <p className="text-red-600 mb-2">Non-refundable</p> */}
        <p className="text-xl font-semibold mb-2 p-2">Total Price: ₹{singlePackage.Price}</p>
        {/* <p className="text-gray-600 mb-4">Per night of 1 room</p> */}

        <Link to={`/holidaypackages/checkout/${packageName}?price=${price}`} >
        <button
          className="bg-[#90CCBA] hover:bg-[#46c79f] text-white px-4 py-2 rounded w-full p-2 pt-2"
        >
          Reserve Now
        </button>
        </Link>

      </div>
    </div>
  );
}

export default HolidayAboutAndBox;












// import React, { useState } from "react";
// // import HolidayAboutPopup from './HolidayAboutPopup'; // Make sure the import name matches the component name
// import HolidayAboutPopup from './HolidayAboutPopUp';

// function HolidayAboutAndBox({ singlePackage }) {
//   const [showPopup, setShowPopup] = useState(false);

//   const togglePopup = () => {
//     setShowPopup(!showPopup);
//   };

//   return (
//     // <div className="hidden md:flex w-[60rem] ml-[6rem]">
//     <div>
//       <h1 className="text-black text-2xl font-bold mr-2 mb-2">Package Overview</h1>
//       {showPopup ? (
//         <HolidayAboutPopup
//           aboutUs={singlePackage.Overview}
//           onClose={togglePopup}
//           className="indent-40"
//         />
//       ) : (
//         <>
//           <p>{singlePackage.Overview.slice(0, 120)}...</p>{" "}
//           {/* Display first 120 characters */}
//           <button onClick={togglePopup} className="text-blue-600 font-semibold">
//             Read More
//           </button>
//         </>
//       )}
      
//         {/* Desktop view Total price card */}
     
//     </div>
//   );
// }

// export default HolidayAboutAndBox;





