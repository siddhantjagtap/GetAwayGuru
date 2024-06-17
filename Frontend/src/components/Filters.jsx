import React, { useState } from "react";
import { FaFilter, FaChevronDown } from "react-icons/fa";

const Filters = ({ setFilters, hotels }) => {
  const [filters, setFiltersState] = useState({
    priceSort: "high-to-low",
    nameSort: "A-Z",
  });
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  // Function to handle sorting by price
  const sortHotelsByPrice = (hotels, sortOrder) => {
    const sortedHotels = [...hotels];
    sortedHotels.sort((a, b) => {
      if (sortOrder === "high-to-low") {
        return b.Price - a.Price;
      } else {
        return a.Price - b.Price;
      }
    });
    return sortedHotels;
  };

  // Function to handle sorting by name
  const sortHotelsByName = (hotels, sortOrder) => {
    const sortedHotels = [...hotels];
    sortedHotels.sort((a, b) => {
      const nameA = a.Hotel_Name.toUpperCase(); // Ignore case
      const nameB = b.Hotel_Name.toUpperCase(); // Ignore case
      if (sortOrder === "A-Z") {
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      } else {
        if (nameA > nameB) return -1;
        if (nameA < nameB) return 1;
        return 0;
      }
    });
    return sortedHotels;
  };

  // Function to handle sorting
  const handleSort = (sortBy, sortOrder) => {
    setFiltersState({ ...filters, [`${sortBy}Sort`]: sortOrder });
    const sortedHotels =
      sortBy === "price"
        ? sortHotelsByPrice(hotels, sortOrder)
        : sortHotelsByName(hotels, sortOrder);
    setFilters(sortedHotels);
    setShowSortDropdown(false);
  };

  return (
    <div className="hidden md:block rounded-xl w-full md:w-[6rem] md:shadow">
      <div className="flex items-center m-2">
        {/* <FaFilter className="text-gray-600 mr-2" /> */}
        {/* <h2 className="text-xl font-bold text-gray-800">Filters</h2> */}
        <div className="relative">
          <button
            className="flex items-center text-gray-600 hover:text-gray-800 focus:outline-none"
            onClick={() => setShowSortDropdown(!showSortDropdown)}
          >
            <span className="font-bold ml-2">Sort</span>
            <FaChevronDown className="ml-[1rem] mt-1" />
          </button>
          {showSortDropdown && (
            <div className="w-[10rem] absolute right-0 mt-2 bg-white shadow-md rounded-md p-2 z-50">
              <button
                className="block w-full text-left hover:bg-gray-100 py-1 px-2 ml-"
                onClick={() => handleSort("price", "high-to-low")}
              >
                Price: High to Low
              </button>
              <button
                className="block w-full text-left hover:bg-gray-100 py-1 px-2"
                onClick={() => handleSort("price", "low-to-high")}
              >
                Price: Low to High
              </button>
              <button
                className="block w-full text-left hover:bg-gray-100 py-1 px-2"
                onClick={() => handleSort("name", "A-Z")}
              >
                Name: A-Z
              </button>
              <button
                className="block w-full text-left hover:bg-gray-100 py-1 px-2"
                onClick={() => handleSort("name", "Z-A")}
              >
                Name: Z-A
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Filters;







// import React, { useState } from "react";
// import { FaFilter } from "react-icons/fa";

// const Filters = ({ setFilters, hotels }) => {
//   const [filters, setFiltersState] = useState({
//     // freeCancellation: false,
//     // freeBreakfast: false,
//     // parkingAvailability: false,
//     priceSort: "high-to-low",
//     nameSort: "A-Z" // Add a new state for name sorting
//   });

//   // Function to handle sorting by price
//   const sortHotelsByPrice = (hotels, sortOrder) => {
//     const sortedHotels = [...hotels];
//     sortedHotels.sort((a, b) => {
//       if (sortOrder === "high-to-low") {
//         return b.Price - a.Price;
//       } else {
//         return a.Price - b.Price;
//       }
//     });
//     return sortedHotels;
//   };

//   // Function to handle sorting by name
//  // Function to handle sorting by name
// const sortHotelsByName = (hotels, sortOrder) => {
//   const sortedHotels = [...hotels];
//   sortedHotels.sort((a, b) => {
//     const nameA = a.Hotel_Name.toUpperCase(); // Ignore case
//     const nameB = b.Hotel_Name.toUpperCase(); // Ignore case
//     if (sortOrder === "A-Z") {
//       if (nameA < nameB) return -1;
//       if (nameA > nameB) return 1;
//       return 0;
//     } else {
//       if (nameA > nameB) return -1;
//       if (nameA < nameB) return 1;
//       return 0;
//     }
//   });
//   return sortedHotels;
// };


//   // Function to handle sorting change for price
//   const handlePriceSortChange = (e) => {
//     const selectedPriceSort = e.target.value;
//     setFiltersState({ ...filters, priceSort: selectedPriceSort });

//     // Sort hotels based on selected option and update state
//     const sortedHotels = sortHotelsByPrice(hotels, selectedPriceSort);
//     setFilters(sortedHotels);
//   };

//   // Function to handle sorting change for name
//   const handleNameSortChange = (e) => {
//     const selectedNameSort = e.target.value;
//     setFiltersState({ ...filters, nameSort: selectedNameSort });

//     // Sort hotels based on selected option and update state
//     const sortedHotels = sortHotelsByName(hotels, selectedNameSort);
//     setFilters(sortedHotels);
//   };

//   return (
//     <div className="hidden md:block bg-white ml-[3.5rem] rounded-xl w-full md:w-[22%] md:h-[42%] md:mt-[4rem] md:shadow">
//       <div className="flex items-center m-4">
//         <FaFilter className="text-gray-600 mr-2" />
//         <h2 className="text-xl font-bold text-gray-800">Filters</h2>
//       </div>
//       <div className="space-y-4 pl-4 pr-4">
        
//         {/* Price Sorting */}
//         <div className="flex items-center">
//           <label htmlFor="price-sort" className="block text-sm font-medium mb-[4rem] text-gray-700">
//             Price
//           </label>
//           <select
//             id="price-sort"
//             className="block ml-[-2rem] appearance-none w-full border border-gray-200 text-gray-700 py-1 px-2 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
//             value={filters.priceSort}
//             onChange={handlePriceSortChange}
//           >
//             <option value="high-to-low">High to Low</option>
//             <option value="low-to-high">Low to High</option>
//           </select>
//         </div>

//         {/* Name Sorting */}
//         <div className="flex items-center">
//           <label htmlFor="name-sort" className="block text-sm font-medium mb-[4rem] text-gray-700">
//             Name
//           </label>
//           <select
//             id="name-sort"
//             className="block ml-[-2rem] appearance-none w-full border border-gray-200 text-gray-700 py-1 px-2 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
//             value={filters.nameSort}
//             onChange={handleNameSortChange}
//           >
//             <option value="A-Z">A-Z</option>
//             <option value="Z-A">Z-A</option>
//           </select>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Filters;


