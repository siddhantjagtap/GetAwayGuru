import { useNavigate } from "react-router-dom";
import Mumbai from "../assets/img/mumbai.png";
import Hyderabad from "../assets/img/hydrabad.png";
// import goa from "../assets/img/goa.jpg";
import goa from "../assets/img/goa.png";
// import jaipur from "../assets/img/jaipur.png";
import dubai from "../assets/img/dubai.png";
import bengaluru from "../assets/img/bengaluru.png";

const PopularDestinations = () => {
  const navigate = useNavigate();

  const handleLocationClick = (location) => {
    navigate(`/location/${location}`);
  };

  return (
    <div className="container mx-auto  py-4">
      <h1 className="md:text-xl text-2xl font-bold md:mb-4 mb-[2rem] md:ml-[1rem] ml-[1rem]">Popular Destinations</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:grid-cols-5 gap-4 md:ml-0 ml-[1.3rem] px-4">
        <button onClick={() => handleLocationClick('Mumbai')}>
          <img
            src={Mumbai}
            alt="Image 1"
            className="rounded-xl object-cover md:w-full w-[25rem] sm:h-22 md:h-[21rem] h-[29rem] size-16 md:transition duration-300 transform md:hover:scale-110"
          />
        </button>
        <button onClick={() => handleLocationClick('Hyderabad')}>
          <img
            src={Hyderabad}
            alt="Image 2"
            className="rounded-xl object-cover md:w-full w-[25rem] sm:h-22 md:h-[21rem] h-[29rem] size-16 transition duration-300 transform hover:scale-110"
          />
        </button>
        <button onClick={() => handleLocationClick('Goa')}>
          <img
            src={goa}
            alt="Image 3"
            className="rounded-xl object-cover md:w-full w-[25rem] sm:h-22 md:h-[21rem] h-[29rem] size-16 transition duration-300 transform hover:scale-110"
          />
        </button>
        <button onClick={() => handleLocationClick('Dubai')}>
          <img
            src={dubai}
            alt="Image 4"
            className="rounded-xl object-cover md:w-full w-[25rem] sm:h-22 md:h-[21rem] h-[29rem] size-16 transition duration-300 transform hover:scale-110"
          />
        </button>
        <button onClick={() => handleLocationClick('Bengaluru')}>
          <img
            src={bengaluru}
            alt="Image 5"
            className="rounded-xl object-cover md:w-full w-[25rem] sm:h-22 md:h-[21rem] h-[29rem] size-16 transition duration-300 transform hover:scale-110"
          />
        </button>
      </div>
    </div>
  );
};

export default PopularDestinations;
















//finalll
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import "react-date-range/dist/styles.css";
// import "react-date-range/dist/theme/default.css";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import Mumbai from "../assets/img/mumbai.jpg"
// import Hyderabad from "../assets/img/hydrabad.jpg"
// import goa from "../assets/img/goa.jpg"
// import jaipur from "../assets/img/jaipur.jpg"
// import manali from "../assets/img/manali.jpg"

// const PopularDestinations = ()=> {
//   const { selectedLocation } = useParams();
//   const navigate = useNavigate();
//   const [hotels, setHotels] = useState('')
  
//   useEffect(() => {
//     const fetchHotels = async () => {
//       try {
//         if (selectedLocation) {
//           const url = import.meta.env.VITE_BASE_URL;
//           const response = await axios.get(
//             `${url}/api/hotels/location/${selectedLocation}`
//           );
//           setHotels(response.data); // Update the hotels state in the parent component
//         }
//       } catch (error) {
//         console.error("Error fetching hotels:", error);
//       }
//     };

//     fetchHotels();
//   }, [selectedLocation, setHotels]);

//   // const handleSearch = () => {
//   //   navigate(`/hotels/location/${selectedLocation}`);
//   // }
  
//     return (
//       <div className="container mx-auto px-4 py-4">
//         <h1 className="md:text-xl text-2xl font-bold md:mb-4 mb-[2rem] md:ml-0 ml-[1rem]">Popular Destinations</h1>
  
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:grid-cols-5 gap-4 md:ml-0 ml-[3rem]">
//           <button onClick={()=>{navigate(`/hotels/location/mumbai`);}}>
//           <img
//             src={Mumbai}
//             alt="Image 1"
//             className="rounded-xl object-cover md:w-full w-[22rem] sm:h-22 md:h-[21rem] h-[32rem] size-16 transition duration-300 transform hover:scale-110"
//           />
//           </button>
//           <button onClick={()=>{navigate(`/hotels/location/Hyderabad`);}}>
//           <img
//             src={Hyderabad}
//             alt="Image 2"
//             className="rounded-xl object-cover md:w-full w-[22rem] sm:h-22 md:h-[21rem] h-[32rem] size-16 transition duration-300 transform hover:scale-110"
//           />
//           </button>
//           <button onClick={()=>{navigate(`/hotels/location/goa`);}}>
//           <img
//             src={goa}
//             alt="Image 3"
//             className="rounded-xl object-cover md:w-full w-[22rem] sm:h-22 md:h-[21rem] h-[32rem] size-16 transition duration-300 transform hover:scale-110"
//             />
//           </button>
//           <button onClick={()=>{navigate(`/hotels/location/jaipur`);}}>
//           <img
//             src={jaipur}
//             alt="Image 4"
//             className="rounded-xl object-cover md:w-full w-[22rem] sm:h-22 md:h-[21rem] h-[32rem] size-16 transition duration-300 transform hover:scale-110"
//           />
//           </button>
//           <button onClick={()=>{navigate(`/hotels/location/manali`);}}>
//           <img
//             src={manali}
//             alt="Image 5"
//             className="rounded-xl object-cover md:w-full w-[22rem] sm:h-22 md:h-[21rem] h-[32rem] size-16 transition duration-300 transform hover:scale-110"
//           />
//            </button>
//         </div>
//       </div>
//   );
// }

// export default PopularDestinations;





