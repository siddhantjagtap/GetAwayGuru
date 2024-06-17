import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
// import Footer from "../components/Footer";

function EventsSinglePage() {
  const { eventName } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showTerms, setShowTerms] = useState(false);
  const [showLayout, setShowLayout] = useState(false);
  const [isLayoutOpen, setIsLayoutOpen] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const url = import.meta.env.VITE_BASE_URL;
        const response = await axios.get(`${url}/api/events/name/${encodeURIComponent(eventName)}`);
        setEvent(response.data);
        setShowLayout(response.data.Event_Category.toLowerCase() === 'music shows');
        setLoading(false);
      } catch (error) {
        console.error("Error fetching event:", error);
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventName]);

  if (loading) {
    return <Loading />; // Show the loading spinner while data is being fetched
  }

  if (!event) {
    return (
      <div className="flex justify-center items-center h-screen">
        Event not found
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center px-4 sm:px-0 md:ml-0 ml-[2rem]">
        <div className="mt-6 w-full sm:w-[62rem] sm:ml-8">
          <img
            className="object-center rounded mt-2 max-w-full"
            src={event.Main_Img}
            alt={event.Event_Name}
          />
        </div>

        {/* price box */}
        <div className="border border-slate-400 w-full rounded-lg p-8 mt-8 sm:w-[60rem]">
          <div className="flex flex-col items-center sm:flex-row">
            <h2 className="text-2xl font-bold mb-2 text-black text-center sm:text-left">
              {event.Event_Name}
            </h2>
            <Link className="md:ml-auto" to={`/events/checkout/${eventName}`}>
              <button className="bg-[#90CCBA] hover:bg-[#46c79f] text-white font-bold py-2 px-8 rounded md:ml-auto ">
                Book Now
              </button>
            </Link>
          </div>
          <h2 className="text-xl font-semibold mt-4 text-black text-center sm:text-left">
            {event.Show_venu}
          </h2>
          <div className="flex justify-center sm:justify-start">
            <p className="text-xl font-semibold mb-2 text-black">
              {event.Date}
            </p>
            <p className="text-xl ml-[1rem] font-semibold mb-2 text-black">
              | ₹ {event.Price}
            </p>
          </div>
          <p className="text-mx mb-2 text-gray-500">{event.Event_Category}</p>
          <h2 className="text-xl font-semibold mt-2 text-black text-center sm:text-left">
            {event.Venue_addr}
          </h2>
        </div>

        <div className="border border-slate-400 w-full rounded-lg p-8 mt-8 sm:w-[60rem]">
          <div className="flex flex-col items-center sm:flex-row sm:items-start">
            <img
              src={event.Artist_Img}
              alt={event.Artist_Name}
              className="w-[5rem] h-[5rem] rounded-full mb-4 sm:mb-0 sm:mr-4"
            />
            <div className="flex flex-col items-center sm:items-start">
              <div className="w-full mt-[1rem] sm:mt-0 sm:mb-4 text-center sm:text-left">
                <h2 className="text-2xl font-bold mb-2">
                  {event.Event_Name}
                </h2>
                <p className="text-gray-600">{event.Artist_Name}</p>
              </div>
              <div className="w-full">
                <p className="font-bold text-2xl mb-2 text-center sm:text-left">About</p>
                <p className="mb-4 text-center sm:text-left">{event.About}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Terms and Conditions Section */}
        <div className="w-full mt-8 mb-4">
          <button
            className="flex items-center justify-between md:w-[62rem] md:ml-[9.5rem]  w-full border text-black font-bold py-2 px-4 rounded"
            onClick={() => setShowTerms(!showTerms)}
          >
            <span>Terms and Conditions</span>
            <span>{showTerms ? "▲" : "▼"}</span>
          </button>
          {showTerms && (
            <div className="p-4 bg-gray-100 md:w-[62rem] md:ml-[9.5rem] rounded">
              <p>
                * All attendees must have a valid ticket for entry.
                <br />
                * The event organizers reserve the right to refuse admission
                to any person whose conduct is deemed inappropriate or
                disruptive.
                <br />
                * All performances are subject to change or cancellation
                without notice.
                <br />
                * Photography and video recording of the performances are
                strictly prohibited without prior written consent from the
                organizers.
                <br />
                * By attending the event, you consent to being photographed or
                filmed and to your image being used in promotional materials.
                <br />
                * The organizers are not responsible for lost or stolen items.
                <br />
                * Any disputes arising from the event will be governed by the
                laws of the jurisdiction in which the event is held.
                <br />* These terms and conditions are subject to change at
                any time without prior notice.
              </p>
            </div>
          )}
        </div>

        {/* Concert ground layout Section */}
        {showLayout && (
          <div className="w-full mt-8 mb-4">
            <button
              className="flex items-center justify-between md:w-[62rem] md:ml-[9.5rem] w-full border text-black font-bold py-2 px-4 rounded"
              onClick={() => setIsLayoutOpen(!isLayoutOpen)}
            >
              <span>Concert ground layout</span>
              <span>{isLayoutOpen ? "▲" : "▼"}</span>
            </button>
            {isLayoutOpen && (
              <div className="p-4 rounded md:w-[55rem]">
                <img
                  src={event.Venu_Layout}
                  alt="Concert ground layout"
                  className="w-full md:w-[62rem] md:ml-[9.5rem]  h-auto rounded sm:w-[30rem] sm:h-[45rem] sm:ml-[14rem]"
                />
              </div>
            )}
          </div>
        )}
      </div>
      {/* <Footer /> */}
    </>
  );
}

export default EventsSinglePage;










// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import Navbar from "../components/Navbar";
// import { Link } from "react-router-dom";
// import Loading from "../components/Loading";

// function EventsSinglePage() {
//   const { eventName } = useParams();
//   const [event, setEvent] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [showTerms, setShowTerms] = useState(false);
//   const [showLayout, setShowLayout] = useState(false);

//   useEffect(() => {
//     const fetchEvent = async () => {
//       try {
//         setLoading(true);
//         const url = import.meta.env.VITE_BASE_URL;
//         const response = await axios.get(`${url}/api/events/name/${eventName}`);
//         setEvent(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching event:", error);
//         setLoading(false);
//       }
//     };

//     fetchEvent();
//   }, [eventName]);

//   if (loading) {
//     return <Loading />; // Show the loading spinner while data is being fetched
//   }

//   if (!event) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         Event not found
//       </div>
//     );
//   }

//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen flex flex-col items-center px-4 sm:px-0">
//         {/* <h1 className="md:text-xl font-bold md:mb-4 text-sm mt-2 text-center sm:text-left sm:ml-[9rem]">
//           {event.Event_Name}
//         </h1> */}
//         <div className="mt-6 w-full sm:w-[62rem] sm:ml-8">
//           <img
//             className="object-center rounded mt-2 min-h-[18rem] max-w-full sm:h-[24rem] sm:w-[60rem]"
//             src={event.Main_Img}
//             alt={event.Event_Name}
//           />
//         </div>

//         {/* price box */}
//         <div className="border border-slate-400 w-full rounded-lg p-8 mt-8 sm:h-[13rem] sm:w-[60rem]">
//           <div className="flex flex-col items-center sm:flex-row">
//             <h2 className="text-2xl font-bold mb-2 text-black text-center sm:text-left">
//               {event.Event_Name}
//             </h2>
//             <Link className="md:ml-auto" to={`/events/checkout/${eventName}`}>
//               <button className="bg-[#90CCBA] hover:bg-[#46c79f] text-white font-bold py-2 px-8 rounded md:ml-auto ">
//                 Book Now
//               </button>
//             </Link>
//           </div>
//           <h2 className="text-xl font-semibold mt-4 text-black text-center sm:text-left">
//             {event.Show_venu}
//           </h2>
//           <div className="flex justify-center sm:justify-start">
//             <p className="text-xl font-semibold mb-2 text-black">
//               {event.Date}
//             </p>
//             <p className="text-xl ml-[1rem] font-semibold mb-2 text-black">
//               | ₹ {event.Price}
//             </p>
//           </div>
//           <h2 className="text-xl font-semibold mt-2 text-black text-center sm:text-left">
//             {event.Venue_addr}
//           </h2>
//         </div>

//         <div className="border border-slate-400 w-full rounded-lg p-8 mt-8 sm:h-[23rem] sm:w-[60rem]">
//           <div className="flex flex-col items-center sm:flex-row sm:items-start">
//             <img
//               src={event.Artist_Img}
//               alt={event.Artist_Name}
//               className="w-[5rem] h-[5rem] rounded-full mb-4 sm:mb-0 sm:mr-4"
//             />
//             <div className="flex flex-col items-center sm:items-start">
//               <div className="w-full mt-[1rem] sm:mt-0 sm:mb-4 text-center sm:text-left">
//                 <h2 className="text-2xl font-bold mb-2">
//                   {event.Event_Name}
//                 </h2>
//                 <p className="text-gray-600">{event.Artist_Name}</p>
//               </div>
//               <div className="w-full">
//                 <p className="font-bold text-2xl mb-2 text-center sm:text-left">About</p>
//                 <p className="mb-4 text-center sm:text-left">{event.About}</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Terms and Conditions Section */}
//         <div className="w-full mt-8">
//           <button
//             className="flex items-center justify-between md:w-[62rem] md:ml-[9.5rem]  w-full border text-black font-bold py-2 px-4 rounded"
//             onClick={() => setShowTerms(!showTerms)}
//           >
//             <span>Terms and Conditions</span>
//             <span>{showTerms ? "▲" : "▼"}</span>
//           </button>
//           {showTerms && (
//             <div className="p-4 bg-gray-100 md:w-[62rem] md:ml-[9.5rem]  rounded">
//               <p>
//                 * All attendees must have a valid ticket for entry.
//                 <br />
//                 * The event organizers reserve the right to refuse admission
//                 to any person whose conduct is deemed inappropriate or
//                 disruptive.
//                 <br />
//                 * All performances are subject to change or cancellation
//                 without notice.
//                 <br />
//                 * Photography and video recording of the performances are
//                 strictly prohibited without prior written consent from the
//                 organizers.
//                 <br />
//                 * By attending the event, you consent to being photographed or
//                 filmed and to your image being used in promotional materials.
//                 <br />
//                 * The organizers are not responsible for lost or stolen items.
//                 <br />
//                 * Any disputes arising from the event will be governed by the
//                 laws of the jurisdiction in which the event is held.
//                 <br />* These terms and conditions are subject to change at
//                 any time without prior notice.
//               </p>
//             </div>
//           )}
//         </div>

//         {/* Concert ground layout Section */}
//         <div className="w-full mt-8">
//           <button
//             className="flex items-center justify-between md:w-[62rem] md:ml-[9.5rem] w-full border text-black font-bold py-2 px-4 rounded"
//             onClick={() => setShowLayout(!showLayout)}
//           >
//             <span>Concert ground layout</span>
//             <span>{showLayout ? "▲" : "▼"}</span>
//           </button>
//           {showLayout && (
//             <div className="p-4 rounded md:w-[55rem]">
//               <img
//                 src={event.Venu_Layout}
//                 alt="Concert ground layout"
//                 className="w-full md:w-[62rem] md:ml-[9.5rem]  h-auto rounded sm:w-[30rem] sm:h-[45rem] sm:ml-[14rem]"
//               />
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

// export default EventsSinglePage;