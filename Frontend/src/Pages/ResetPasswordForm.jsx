import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/img/logo.jpg";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ResetPasswordForm = () => {
  const { token } = useParams(); // Get the token from the URL parameters  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('handleSubmit function called');

    // Check if password and confirmPassword match
    if (password === confirmPassword) {
      const resetPassword = async () => {
        console.log('resetPassword function called');
        try {
          const url = import.meta.env.VITE_BASE_URL;
          const requestData = {
            password,  // Send the actual password
          };
          console.log('Request data:', requestData);
          const response = await axios.post(`${url}/api/reset-password/${token}`, requestData);

          // Handle the successful response
          if ("Password Reset Successfully") {
            setSuccessMessage("Password Reset Successfully");
            setErrorMessage('');
            toast.success("Password Reset Successfully", {
              style: {
                backgroundColor: 'green',
                color: 'white'
              }
            });
            // Redirect to the login page after a short delay
            // navigate('/login');
            setTimeout(() => {
                    navigate('/login');
                    }, 3000); // 3-second delay
          } else {
            setErrorMessage(response.data.message);
            setSuccessMessage('');
            toast.error(response.data.message, {
              style: {
                backgroundColor: 'red',
                color: 'white'
              }
            });
          }
        } catch (error) {
          // Handle the error
          setErrorMessage('An error occurred. Please try again later.');
          setSuccessMessage('');
          toast.error('An error occurred. Please try again later.', {
            style: {
              backgroundColor: 'red',
              color: 'white'
            }
          });
          console.error('Error:', error);
        }
      };

      resetPassword();
    } else {
      setErrorMessage('Passwords do not match');
      setSuccessMessage('');
      toast.error('Passwords do not match', {
        style: {
          backgroundColor: 'red',
          color: 'white'
        }
      });
    }
  };

  return (
    <>
      <Navbar />
      <ToastContainer /> {/* Add ToastContainer to render toasts */}
      <div className="bg-slate-200 min-h-screen flex items-center justify-center">
        <div className="max-w-md  mx-auto p-6 bg-white p-6 rounded-md shadow-md h-[25rem] w-[25rem]">
          <Link to='/'>
            <img src={logo} alt="Logo" className="md:h-14 md:w-22 h-10 ml-[2rem] mb-2" />
          </Link>
          <h2 className="text-xl font-semibold mb-6">Reset Password</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="password" className="block font-medium mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="confirmPassword" className="block font-medium mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
            {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
            <button
              type="submit"
              className="w-full bg-[#90CCBA] hover:bg-[#46c79f] text-white px-4 py-2 rounded-md transition-colors duration-300"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPasswordForm;








//static final
// import React, { useState } from 'react';
// import Navbar from '../components/Navbar';
// import { Link } from "react-router-dom";
// import logo from "../assets/img/logo.jpg";


// const ResetPasswordForm = () => {
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle form submission logic here
//     console.log('Password:', password);
//     console.log('Confirm Password:', confirmPassword);
//   };

//   return (
//     <>
//     <Navbar />
// <div className="bg-slate-200 min-h-screen flex items-center justify-center">
//     <div className="max-w-md  mx-auto p-6 bg-white p-6 rounded-md shadow-md h-[25rem] w-[25rem]">
//     <Link to='/'>
//             <img src={logo} alt=""
//             className="md:h-14 md:w-22 h-10 ml-[2rem] mb-2" />
//           </Link>
//       <h2 className="text-xl font-semibold mb-6">Reset Password</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label htmlFor="password" className="block font-medium mb-1">
//             Password
//           </label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//         </div>
//         <div className="mb-6">
//           <label htmlFor="confirmPassword" className="block font-medium mb-1">
//             Confirm Password
//           </label>
//           <input
//             type="password"
//             id="confirmPassword"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//         </div>
//         <button
//           type="submit"
//           className="w-full bg-[#90CCBA] hover:bg-[#46c79f] text-white px-4 py-2 rounded-md transition-colors duration-300"
//         >
//           Reset Password
//         </button>
//       </form>
//     </div>
//     </div>
//     </>
//   );
// };

// export default ResetPasswordForm;