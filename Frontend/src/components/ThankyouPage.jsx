import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ThankyouBlast from "../assets/img/Thankyoublast.gif";

const ThankyouPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/");
    }, 4000);

    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <>
      {/* <Navbar /> */}
      <div
        className="min-h-screen flex items-center justify-center"
        style={{
          backgroundImage: `url(${ThankyouBlast})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col w-full items-center">
            <div className="w-[5rem] h-[5rem] md:w-[7rem] md:h-[7rem] rounded-full bg-green-500 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 md:h-24 md:w-24 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <Link to="/" className="text-teal-500 font-semibold">
              <h1 className="text-4xl md:text-7xl font-bold mt-8 mb-4 text-center">
                Thank you!
              </h1>
            </Link>
            <p className="text-gray-600 text-lg md:text-lg text-center leading-relaxed">
              Your booking has been confirmed!
              <br />
              "Thank you for choosing GetawayGuru for all your travel needs!
              <br />
              Whether you're booking a hotel, a holiday package, or planning an
              event,
              <br /> we are dedicated to providing you with the best options
              and a seamless experience. 🌟💖"
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ThankyouPage;















// import React from "react";
// import Navbar from "./Navbar";
// import { Link } from "react-router-dom";

// const ThankyouPage = () => {
//   return (
//     <>
//       {/* <Navbar /> */}
//       <div className="bg-white min-h-screen flex items-center justify-center">
//         <div className="container mx-auto px-4">
//           <div className="flex flex-col w-full items-center">
//             <div className="w-[5rem] h-[5rem] md:w-[7rem] md:h-[7rem] rounded-full bg-green-500 flex items-center justify-center">
              
             
//                <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-16 w-16 md:h-24 md:w-24 text-white"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
//                 />
//               </svg>
             
//             </div>
//             <Link to="/" className="text-teal-500 font-semibold"><h1 className="text-4xl md:text-7xl font-bold mt-8 mb-4 text-center">Thank you!</h1></Link>
//             <p className="text-gray-600 text-lg md:text-lg text-center leading-relaxed">
//               Your booking has been confirmed!
//               <br />
//               "Thank you for choosing GetawayGuru for all your travel needs!<br /> Whether you're booking a hotel, a holiday package, or planning an event,<br /> we are dedicated to providing you with the best options and a seamless experience. 🌟💖"
//             </p>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ThankyouPage;
