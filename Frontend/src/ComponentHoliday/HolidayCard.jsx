import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ImLocation2 } from "react-icons/im";

const HolidayCard = ({ holiday }) => {
  const [expanded, setExpanded] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  console.log("dwqd", holiday);
  const facilities = typeof holiday.Facilities === "string" ? holiday.Facilities.split(",") : [holiday.Facilities];
  const visibleFacilities = expanded ? facilities : facilities.slice(0, 3);
  const formattedPakageName = holiday.Package_Name.replace(/ /g, '-');
  const trimmedPackageName = holiday.Package_Name.length > 20 ? `${holiday.Package_Name.slice(0, 20)}...` : holiday.Package_Name;
  
  const handleToggleExpand = (e) => {
    e.preventDefault();
    setExpanded(!expanded);
  };

  return (
    <>
     <Link to={`/holidaypackages/${formattedPakageName}`}>
    
    <div
      className={`transform transition-transform duration-300 hover:scale-105 hover:bg-gray-100 bg-white w-[20rem] md:w-[22rem] md:ml-0 ml-[1rem] shadow font-poppins rounded-lg overflow-hidden mb-4 transition-all duration-300 ${
        expanded ? 'md:h-auto' : 'md:h-[32rem]'
      } flex flex-col justify-between`}
    >
     
      <div className="h-auto mt-2 ml-2 rounded-lg w-full mr-2">
        <img
          src={holiday?.Card_imgae}
          alt={holiday?.Package_Name}
          className="object-cover w-[18rem] md:w-[20rem] h-[12rem] md:h-[14rem] rounded m-2"
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <div>
          <h2
            className="text-xl font-semibold mb-2 text-black"
            onMouseEnter={() => setShowPopup(true)}
            onMouseLeave={() => setShowPopup(false)}
          >
            {trimmedPackageName}
            {showPopup && (
              <span className="absolute bg-white shadow p-2 rounded-lg text-sm">{holiday.Package_Name}</span>
            )}
          </h2>
          <div className="flex items-center mb-2">
            <ImLocation2 className="text-1xl mt-[4px] mr-2" />
            <p className="text-black">{holiday.Location}</p>
          </div>
          <ul className="text-black flex flex-col mb-4 text-sm list-disc pl-5 transition-all duration-300">
            {visibleFacilities.map((facility, index) => (
              <li key={index}>{facility}</li>
            ))}
          </ul>
          {facilities.length > 3 && (
            <button
              onClick={handleToggleExpand}
              className="text-[#90CCBA] hover:text-[#46c79f] text-sm"
            >
              {expanded ? "Show less" : "Show more"}
            </button>
          )}
        </div>
        
        <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
          <p className="text-black text-lg font-bold">₹ {holiday.Price}</p>
          
            <button className="bg-[#90CCBA] hover:bg-[#46c79f] text-white font-bold py-2 px-4 rounded">
              Book Now
            </button>
          
        </div>
      </div>
    </div>
    </Link>
    </>
  );
};

export default HolidayCard;















// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { ImLocation2 } from "react-icons/im";

// const HolidayCard = ({ holiday }) => {
//   const [expanded, setExpanded] = useState(false);
//   const [showPopup, setShowPopup] = useState(false);

//   const facilities = typeof holiday.Facilities === "string" ? holiday.Facilities.split(",") : [holiday.Facilities];
//   const visibleFacilities = expanded ? facilities : facilities.slice(0, 3);
//   const formattedPakageName = holiday.Package_Name.replace(/ /g, '-');
//   const trimmedPackageName = holiday.Package_Name.length > 20 ? `${holiday.Package_Name.slice(0, 20)}...` : holiday.Package_Name;
  
//   const handleToggleExpand = (e) => {
//     e.preventDefault();
//     setExpanded(!expanded);
//   };

//   return (
//     <div
//       className={` transform transition-transform duration-300 hover:scale-105 bg-white w-[18rem] md:m-0 m-4 md:w-[22rem] shadow font-poppins rounded-lg overflow-hidden mb-4 transition-all duration-300 ${
//         expanded ? 'md:h-auto' : 'md:h-[32rem]'
//       } flex flex-col justify-between`}
//     >
//       <div className="h-auto mt-2 ml-2 rounded-lg w-full mr-2">
//         <img
//           src={holiday?.Card_imgae}
//           alt={holiday?.Package_Name}
//           className="object-cover w-[16rem] h-[12rem] md:h-[14rem] md:w-[20rem] md:pt-2 rounded m-2"
//         />
//       </div>
//       <div className="p-4 flex flex-col flex-grow">
//         <div>
//           <h2
//             className="text-xl font-semibold mb-2 text-black"
//             onMouseEnter={() => setShowPopup(true)}
//             onMouseLeave={() => setShowPopup(false)}
//           >
//             {trimmedPackageName}
//             {showPopup && (
//               <span className="absolute bg-white shadow p-2 rounded-lg text-sm">{holiday.Package_Name}</span>
//             )}
//           </h2>
//           <div className="flex items-center mb-2">
//             <ImLocation2 className="text-1xl mt-[4px] mr-2" />
//             <p className="text-black">{holiday.Location}</p>
//           </div>
//           <ul className="text-black flex flex-col mb-4 text-sm list-disc pl-5 transition-all duration-300">
//             {visibleFacilities.map((facility, index) => (
//               <li key={index}>{facility}</li>
//             ))}
//           </ul>
//           {facilities.length > 3 && (
//             <button
//               onClick={handleToggleExpand}
//               className="text-[#90CCBA] hover:text-[#46c79f] text-sm"
//             >
//               {expanded ? "Show less" : "Show more"}
//             </button>
//           )}
//         </div>
        
//         <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
//           <p className="text-black text-lg font-bold">₹ {holiday.Price}</p>
//           <Link to={`/holidaypackages/${formattedPakageName}`}>
//             <button className="bg-[#90CCBA] hover:bg-[#46c79f] text-white font-bold py-2 px-4 rounded">
//               Book Now
//             </button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HolidayCard;



