import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const OTPVerification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { email } = location.state; // Retrieve the email from the state
  const [otp, setOTP] = useState(['', '', '', '', '', '']);

  const handleChange = (e, index) => {
    const newOTP = [...otp];
    newOTP[index] = e.target.value;
    setOTP(newOTP);

    if (e.target.value.length === 1 && index < 5) {
      const nextInput = document.querySelector(`input[name="otp-${index + 1}"]`);
      if (nextInput) {
        nextInput.focus();
      }
    } else if (e.target.value.length === 0 && index > 0) {
      const prevInput = document.querySelector(`input[name="otp-${index - 1}"]`);
      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  const handleVerify = async () => {
    const otpValue = otp.join('');
    try {
      const url = import.meta.env.VITE_BASE_URL; // Use the environment variable for the base URL
      const response = await fetch(`${url}/api/verifyOTP`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp: otpValue }),
      });

      const data = await response.json();
      if (response.ok) {
        // Navigate to login page after successful OTP verification
        navigate('/login');
      } else {
        alert(data.msg); // Show error message
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-4 ml-[5rem]">Enter OTP Code</h2>
          <div className="flex justify-center mb-4">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                name={`otp-${index}`}
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e, index)}
                className="w-12 h-12 mr-2 text-center text-2xl font-bold border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            ))}
          </div>
          <button
            onClick={handleVerify}
            className="bg-[#90CCBA] hover:bg-[#46c79f] text-white px-4 py-2 ml-[8rem] rounded-md focus:outline-none focus:ring-2 "
          >
            Verify OTP
          </button>
        </div>
      </div>
    </>
  );
};

export default OTPVerification;


















//finalll
// import React, { useState } from 'react';
// import Navbar from '../components/Navbar';

// const OTPVerification = () => {
//   const [otp, setOTP] = useState(['', '', '', '', '', '']);

//   const handleChange = (e, index) => {
//     const newOTP = [...otp];
//     newOTP[index] = e.target.value;
//     setOTP(newOTP);

//     if (e.target.value.length === 1 && index < 5) {
//       const nextInput = document.querySelector(`input[name="otp-${index + 1}"]`);
//       if (nextInput) {
//         nextInput.focus();
//       }
//     } else if (e.target.value.length === 0 && index > 0) {
//       const prevInput = document.querySelector(`input[name="otp-${index - 1}"]`);
//       if (prevInput) {
//         prevInput.focus();
//       }
//     }
//   };

//   const handleVerify = () => {
//     const otpValue = otp.join('');
//     // Perform OTP verification logic here
//     console.log('OTP:', otpValue);
//   };

//   return (
//     <>
//     <Navbar />
//     <div className="flex flex-col items-center justify-center h-screen ">
//       <div className="bg-white rounded-lg shadow-md p-8 ">
//         <h2 className="text-2xl font-bold mb-4 ml-[5rem]">Enter OTP Code</h2>
//         <div className="flex justify-center mb-4">
//           {otp.map((digit, index) => (
//             <input
//               key={index}
//               type="text"
//               name={`otp-${index}`}
//               maxLength={1}
//               value={digit}
//               onChange={(e) => handleChange(e, index)}
//               className="w-12 h-12 mr-2 text-center text-2xl font-bold border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
//             />
//           ))}
//         </div>
//         <button
//           onClick={handleVerify}
//           className="bg-[#90CCBA] hover:bg-[#46c79f] text-white px-4 py-2 ml-[8rem] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//         >
//           Verify OTP
//         </button>
//       </div>
//     </div>
//     </>
//   );
// };

// export default OTPVerification;