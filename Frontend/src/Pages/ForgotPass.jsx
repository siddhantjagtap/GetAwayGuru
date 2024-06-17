import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import logo from "../assets/img/logo.jpg";
import Navbar from '../components/Navbar';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

const ForgotPass = () => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [submitted, setSubmitted] = useState(false); // Add a state to track form submission

  useEffect(() => {
    const fetchData = async () => {
      if (submitted) {
        try {
          // Make the API call to the forgot password endpoint
          const url = import.meta.env.VITE_BASE_URL;
          const response = await axios.post(`${url}/api/forgot-password`, { email });

          // Handle the successful response
          if ("Email sent Successfully") {
            setSuccessMessage("Email sent Successfully");
            setErrorMessage('');
            toast.success("Email sent Successfully", {
              style: {
                backgroundColor: 'green',
                color: 'white'
              }
            });
            
          } else {
            setErrorMessage(response.data.message);
            setSuccessMessage('');
          }
        } catch (error) {
          // Handle the error
          setErrorMessage('An error occurred. Please try again later.');
          setSuccessMessage('');
          console.error('Error:', error);
        } finally {
          setSubmitted(false); // Reset the submitted state after API call
        }
      }
    };

    fetchData();
  }, [email, submitted]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true); // Set the submitted state to trigger the API call
  };

  return (
    <>
      {/* <Navbar /> */}
      <div className="bg-slate-200 min-h-screen flex items-center justify-center">
        <div className="bg-white p-6 rounded-md shadow-md h-[22rem] w-[22rem]">
          <Link to='/'>
            <img src={logo} alt="" className="md:h-14 md:w-22 h-10 ml-[2rem] mb-2" />
          </Link>
          <h2 className="text-xl font-bold mb-4">Forgot Password</h2>

          {/* Display success message */}
          {successMessage && (
            <div className="mb-4 text-green-500">{successMessage}</div>
          )}

          {/* Display error message */}
          {errorMessage && (
            <div className="mb-4 text-red-500">{errorMessage}</div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mb-2 border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-[#90CCBA] hover:bg-[#46c79f] text-white px-4 py-2 rounded-md transition-colors duration-300 w-[19rem]"
            >
              Submit
            </button>
          </form>
          <p className="mt-4">
            <a href="/login" className="text-blue-500 hover:text-blue-700">
              Back to Login
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default ForgotPass;












//final static
// import React, { useState } from 'react';
// import { Link } from "react-router-dom";
// import logo from "../assets/img/logo.jpg";
// import Navbar from '../components/Navbar';

// const ForgotPass = () => {
//   const [email, setEmail] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Implement your forgot password logic here
//     console.log('Email:', email);
//   };

//   return (
//     <>
//     <Navbar />
//     <div className="bg-slate-200 min-h-screen flex items-center justify-center">
//       <div className="bg-white p-6 rounded-md shadow-md h-[22rem] w-[22rem]">
//       <Link to='/'>
//             <img src={logo} alt=""
//             className="md:h-14 md:w-22 h-10 ml-[2rem] mb-2" />
//           </Link>
//         <h2 className="text-xl font-bold mb-4 ">Forgot Password</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label htmlFor="email" className="block font-medium mb-1">
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full mb-2 border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="bg-[#90CCBA] hover:bg-[#46c79f] text-white px-4 py-2 rounded-md transition-colors duration-300 w-[19rem]"
//           >
//             Submit
//           </button>
//         </form>
//         <p className="mt-4">
//           <a href="/login" className="text-blue-500 hover:text-blue-700">
//             Back to Login
//           </a>
//         </p>
//       </div>
//     </div>
//     </>
//   );
// };

// export default ForgotPass;