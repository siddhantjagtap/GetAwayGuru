import React, { useState } from "react";
import HotelCard from "./HotelCard";
import Filters from "./Filters";

const HotelList = ({ hotels }) => {
  const [filteredHotels, setFilteredHotels] = useState(hotels);
  const [searchQuery, setSearchQuery] = useState('');

  const handleFiltersChange = (filteredHotels) => {
    setFilteredHotels(filteredHotels);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const searchedHotels = filteredHotels.filter((hotel) =>
    hotel.Hotel_Name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 mt-[2rem]">
      <div className="flex items-center mb-4">
        <div className="flex items-center ml-auto">
          <input
            type="text"
            placeholder="Search hotels"
            value={searchQuery}
            onChange={handleSearchChange}
            className="px-4 py-2 md:mr-[2rem] mr-[3rem] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <Filters setFilters={handleFiltersChange} hotels={searchedHotels} className="mr-4 w-[12rem]" />
      </div>
      {searchedHotels.length > 0 ? (
        <>
          <h1 className="w-[21rem] ml-3 text-xl font-semibold mb-4">
            Showing Properties in {searchedHotels[0].Location}
          </h1>
          <div className="ml-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
            {searchedHotels.map((hotel) => (
              <HotelCard key={hotel.Hotel_id} hotel={hotel} />
            ))}
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center min-h-[50vh] text-xl font-semibold">
          Hotel not found
        </div>
      )}
    </div>
  );
};

export default HotelList;






// import React, { useState } from "react";
// import HotelCard from "./HotelCard";
// import Filters from "./Filters";

// const HotelList = ({ hotels }) => {
//   const [filteredHotels, setFilteredHotels] = useState(hotels);
//   const [searchQuery, setSearchQuery] = useState('');

//   const handleFiltersChange = (filteredHotels) => {
//     setFilteredHotels(filteredHotels);
//   };

//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   const searchedHotels = filteredHotels.filter((hotel) =>
//     hotel.Hotel_Name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="container mx-auto px-4 mt-[2rem]">
//       <div className="flex items-center mb-4">
//         <h1 className="w-[21rem] ml-8 text-xl font-semibold">
//           Showing Properties in{" "}
//           {searchedHotels.length ? searchedHotels[0].Location : "Selected Location"}
//         </h1>
//         <Filters setFilters={handleFiltersChange} hotels={searchedHotels} className="mr-4 w-[12rem] "/>
//         <div className="flex items-center ml-auto">
//           <input
//             type="text"
//             placeholder="Search hotels"
//             value={searchQuery}
//             onChange={handleSearchChange}
//             className="px-4 py-2 ml-[rem] mr-[2rem] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//       </div>
//       {searchedHotels.length > 0 ? (
//         <div className="ml-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
//           {searchedHotels.map((hotel) => (
//             <HotelCard key={hotel.Hotel_id} hotel={hotel} />
//           ))}
//         </div>
//       ) : (
//         <div className="ml-8 text-xl font-semibold">
//           Hotel not found
//         </div>
//       )}
//     </div>
//   );
// };

// export default HotelList;





// import React, { useState } from "react";
// import HotelCard from "./HotelCard";
// import Filters from "./Filters";

// const HotelList = ({ hotels }) => {
//   const [filteredHotels, setFilteredHotels] = useState(hotels);

//   const handleFiltersChange = (filteredHotels) => {
//     setFilteredHotels(filteredHotels);
//   };

//   return (
//     <div className="container mx-auto px-4 mt-[2rem]">
//       <div className="flex items-center mb-4">
//         <h1 className="w-[21rem] ml-8 text-xl font-semibold">
//           Showing Properties in{" "}
//           {filteredHotels.length ? filteredHotels[0].Location : "Selected Location"}
//         </h1>
//         <Filters setFilters={handleFiltersChange} hotels={filteredHotels} className="mr-4 w-[12rem] "/>
//         {/* <Filters setFilters={handleFiltersChange} hotels={filteredHotels} className="mr-4 w-[12rem]"/> */}
//       </div>
//       <div className="ml-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
//         {filteredHotels.map((hotel) => (
//           <HotelCard key={hotel.Hotel_id} hotel={hotel} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default HotelList;