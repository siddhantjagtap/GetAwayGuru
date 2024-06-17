import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import HotelCard from '../components/HotelCard';
import HolidayCard from '../ComponentHoliday/HolidayCard';
import Navbar from '../components/Navbar';
import EventsCard from '../ComponentEvents/EventsCard';


const LocationDetails = () => {
  const { selectedLocation } = useParams();
  const [hotels, setHotels] = useState([]);
  const [packages, setPackages] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const fetchLocationData = async () => {
      try {
       
        const url = import.meta.env.VITE_BASE_URL;

        // Fetch hotels
        const hotelsResponse = await axios.get(`${url}/api/hotels/location/${selectedLocation}`);
        setHotels(hotelsResponse.data);

        // Fetch packages
        const packagesResponse = await axios.get(`${url}/api/holidaypackages/location/${selectedLocation}`);
        setPackages(packagesResponse.data);

        // Fetch events
        const eventsResponse = await axios.get(`${url}/api/events/location/${selectedLocation}`);
        setEvents(eventsResponse.data);
       
      } catch (error) {
        console.error('Error fetching location data:', error);
      }
    };

    if (selectedLocation) {
      fetchLocationData();
    }
  }, [selectedLocation]);

  

  return (
    <>
      <Navbar />
      <div>
      <h2 className='md:text-2xl text-xl ml-[2rem] md:mb-[1rem] md:mt-[2rem] font-semibold font-poppins md:ml-[4rem]'>Showing hotels for stay in {selectedLocation}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 md:ml-[3rem] ml-[2rem] mb-2">
          {hotels.length > 0 ? (
            hotels.map((hotel) => <HotelCard key={hotel.id} hotel={hotel} className="hover:bg-gray-100" />)
          ) : (
            <p>No hotels found for this location.</p>
          )}
        </div>

        <h2 className='md:text-2xl text-xl ml-[2rem] md:mb-[1rem] md:mt-[2rem] font-semibold font-poppins md:ml-[4rem]'>Showing holiday packages in {selectedLocation}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 md:ml-[4rem] ml-[1rem]">
          {packages.length > 0 ? (
            packages.map((Package) => <HolidayCard key={Package.id} holiday={Package} />)
          ) : (
            <p>No packages found for this location.</p>
          )}
        </div>

        <h2 className='md:text-2xl text-xl ml-[2rem] md:mb-[1rem] md:mt-[2rem] font-semibold font-poppins md:ml-[4rem]'>Showing events in {selectedLocation}</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 md:ml-[4rem] ml-[1rem] md:mb-2">
          {events.length > 0 ? (
            events.map((event) => <EventsCard key={event.id} event={event} selectedCategory={selectedCategory} />)
          ) : (
            <p>No events found for this location.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default LocationDetails;















//final
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import HotelCard from '../components/HotelCard'; // Import the HotelCard component

// import HolidayCard from '../ComponentHoliday/HolidayCard';
// import Navbar from '../components/Navbar';
// import EventsCard from '../ComponentEvents/EventsCard';

// const LocationDetails = () => {
//   const { selectedLocation } = useParams();
//   const [hotels, setHotels] = useState([]);
//   const [packages, setPackages] = useState([]);
//   const [events, setEvents] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState('');

//   useEffect(() => {
//     const fetchLocationData = async () => {
//       try {
//         const url = import.meta.env.VITE_BASE_URL;

//         // Fetch hotels
//         const hotelsResponse = await axios.get(`${url}/api/hotels/location/${selectedLocation}`);
//         setHotels(hotelsResponse.data);

//         // Fetch packages
//         const packagesResponse = await axios.get(`${url}/api/holidaypackages/location/${selectedLocation}`);
//         setPackages(packagesResponse.data);

//         // Fetch events
//         const eventsResponse = await axios.get(`${url}/api/events/location/${selectedLocation}`);
//         setEvents(eventsResponse.data);
//       } catch (error) {
//         console.error('Error fetching location data:', error);
//       }
//     };

//     if (selectedLocation) {
//       fetchLocationData();
//     }
//   }, [selectedLocation]);

//   return (
//     <>
//     <Navbar />
//     <div>
//       <h2 className='text-2xl ml-[2rem] mb-[1rem] font-bold'>Hotels</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ml-[1rem]">
//         {hotels.map((hotel) => (
//           <HotelCard key={hotel.id} hotel={hotel} />
//         ))}
//       </div>

//       <h2 className='text-2xl ml-[2rem] mb-[1rem] font-bold'>Packages</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ml-[2rem]">
//         {packages.map((Package) => (
//           <HolidayCard key={Package.id} holiday={Package}
//           />
//         ))}
//       </div>

//       <h2 className='text-2xl ml-[2rem] mb-[1rem] font-bold'>Events</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ml-[2rem]">
//         {events.map((event) => (
//           <EventsCard key={event.id} event={event} selectedCategory={selectedCategory} />
//         ))}
//       </div>
//     </div>
//     </>
//   );
// };

// export default LocationDetails;