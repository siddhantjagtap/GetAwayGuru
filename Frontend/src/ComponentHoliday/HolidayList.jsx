import React, { useState } from "react";
import HolidayCard from "./HolidayCard";

const HolidayList = ({ holiday }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const searchedHolidays = holiday.filter((holidays) =>
    holidays.Package_Name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto font-poppins pl-4 pr-4 pt-4 md:pl-[5rem] md:pt-[2rem] md:mb-[2rem] mb-[2rem]">
      <div className="flex items-center mb-4">
        <div className="flex items-center ml-auto">
          <input
            type="text"
            placeholder="Search packages"
            value={searchQuery}
            onChange={handleSearchChange}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-[12rem] mr-[3rem]"
          />
        </div>
      </div>
      {searchedHolidays.length > 0 ? (
        <>
          <h1 className="text-xl font-semibold mb-4 mt-2 md:ml-0 ">
            Showing Properties in {searchedHolidays[0].Location}
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-80">
            {searchedHolidays.map((holidays) => (
              <HolidayCard key={holidays.Package_id} holiday={holidays} />
            ))}
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center min-h-[50vh] text-xl font-semibold">
          Holiday package not found
        </div>
      )}
    </div>
  );
};

export default HolidayList;















// import React from "react";
// import HolidayCard from "./HolidayCard";

// const HolidayList = ({ holiday }) => {
//   return (
//     <div className="container md:mx-auto font-poppins md:pl-[5rem] md:pt-[2rem]">
//       <h1 className="md:text-xl font-semibold md:mb-4 text-sm mb-4 mt-2">
//         Showing Properties in {holiday.length ? holiday[0].Location : 'Selected Location'}
//       </h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-72">
//         {Array.isArray(holiday) && holiday.map((holidays) => (
//           <HolidayCard key={holidays.Package_id} holiday={holidays} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default HolidayList;

