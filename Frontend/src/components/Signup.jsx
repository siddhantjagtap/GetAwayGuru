import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../assets/img/logo.jpg";

function SignUp() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  // validations
  const [validation, setValidation] = useState({});

  function Validation(formData) {
    const errors = {}; // Use an object for error messages

    // Email validation (combined checks and more specific message)
    if (
      formData.email === "" ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      errors.email = "Please enter a valid email address.";
    }

    // Password validation (existing logic)
    if (formData.password === "") {
      errors.password = "Password is required.";
    }

    // Optional: Username validation (example with a regular expression)
    if (formData.username && !/^[a-zA-Z0-9_.]+$/.test(formData.username)) {
      errors.username =
        "Username can only contain letters, numbers, underscores, and periods.";
    }

    return errors;
  }

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setValidation(Validation(formData));

    // Handle successful signup
    try {
      const url = import.meta.env.VITE_BASE_URL;
      const response = await axios.post(`${url}/api/signUp`, formData);
      toast.success("Signup successful!", {
        style: {
          backgroundColor: 'green',
          color: 'white'
        },
        position: "top-right",
        autoClose: 1000,
        onClose: () => navigate("/otpVerification", { state: { email: formData.email } }), // Navigate after the toast is closed
      });
      
    } catch (error) {
      // Handle error
      console.error(error);
      toast.error("An error occurred. Please try again later.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="bg-slate-200 min-h-screen flex justify-center items-center md:flex">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg md:ml-0 ml-4 md:mr-0 mr-4">
        <Link to='/'>
          <img src={logo} alt=""
            className="md:h-14 md:w-22 h-10 ml-[3.5rem]" />
        </Link>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Create Your Account
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-semibold mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2 w-full"
            />
            {validation.username && (
              <p className="text-red-500 text-xs mt-1">{validation.username}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2 w-full"
            />
            {validation.email && (
              <p className="text-red-500 text-xs mt-1">{validation.email}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2 w-full"
            />
            {validation.password && (
              <p className="text-red-500 text-xs mt-1">{validation.password}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-[#90CCBA] hover:bg-[#46c79f] text-white font-semibold py-2 px-4 rounded transition duration-200"
          >
            Sign up
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-gray-600 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-teal-500 font-semibold">
              Log in
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default SignUp;























//finall
// import { Link } from "react-router-dom";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import logo from "../assets/img/logo.jpg";

// function SignUp() {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//   });

//   // validations
//   const [validation, setValidation] = useState({});

//   function Validation(formData) {
//     const errors = {}; // Use an object for error messages

//     // Email validation (combined checks and more specific message)
//     if (
//       formData.email === "" ||
//       !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
//     ) {
//       errors.email = "Please enter a valid email address.";
//     }

//     // Password validation (existing logic)
//     if (formData.password === "") {
//       errors.password = "Password is required.";
//     }

//     // Optional: Username validation (example with a regular expression)
//     if (formData.username && !/^[a-zA-Z0-9_.]+$/.test(formData.username)) {
//       errors.username =
//         "Username can only contain letters, numbers, underscores, and periods.";
//     }

//     return errors;
//   }

//   const handleChange = (event) => {
//     setFormData({ ...formData, [event.target.name]: event.target.value });
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setValidation(Validation(formData));

//     // Handle successful signup
//     try {
//       const url = import.meta.env.VITE_BASE_URL;
//       const response = await axios.post(`${url}/api/signUp`, formData);
//       toast.success("Signup successful!", {
//         style: {
//           backgroundColor: 'green',
//           color: 'white'
//         },
//         position: "top-right",
//         autoClose: 1000,
//         onClose: () => navigate("/login"), // Navigate after the toast is closed
//       });
      
//     } catch (error) {
//       // Handle error
//       console.error(error);
//       toast.error("An error occurred. Please try again later.", {
//         position: "top-right",
//         autoClose: 3000,
//       });
//     }
//   };

//   return (
//     <div className="bg-slate-200 min-h-screen flex justify-center items-center md:flex">
//       <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg md:ml-0 ml-4 md:mr-0 mr-4">
//         <Link to='/'>
//           <img src={logo} alt=""
//             className="md:h-14 md:w-22 h-10 ml-[3.5rem]" />
//         </Link>
//         <h2 className="text-xl font-semibold text-gray-800 mb-2">
//           Create Your Account
//         </h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label htmlFor="username" className="block text-sm font-semibold mb-2">
//               Username
//             </label>
//             <input
//               type="text"
//               id="username"
//               name="username"
//               onChange={handleChange}
//               className="border border-gray-300 rounded px-3 py-2 w-full"
//             />
//             {validation.username && (
//               <p className="text-red-500 text-xs mt-1">{validation.username}</p>
//             )}
//           </div>
//           <div className="mb-4">
//             <label htmlFor="email" className="block text-sm font-semibold mb-2">
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               onChange={handleChange}
//               className="border border-gray-300 rounded px-3 py-2 w-full"
//             />
//             {validation.email && (
//               <p className="text-red-500 text-xs mt-1">{validation.email}</p>
//             )}
//           </div>
//           <div className="mb-4">
//             <label htmlFor="password" className="block text-sm font-semibold mb-2">
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               onChange={handleChange}
//               className="border border-gray-300 rounded px-3 py-2 w-full"
//             />
//             {validation.password && (
//               <p className="text-red-500 text-xs mt-1">{validation.password}</p>
//             )}
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-[#90CCBA] hover:bg-[#46c79f] text-white font-semibold py-2 px-4 rounded transition duration-200"
//           >
//             Sign up
//           </button>
//         </form>
//         <div className="mt-4 text-center">
//           <p className="text-gray-600 text-sm">
//             Already have an account?{" "}
//             <Link to="/login" className="text-teal-500 font-semibold">
//               Log in
//             </Link>
//           </p>
//         </div>
//       </div>
//       <ToastContainer />
//     </div>
//   );
// }

// export default SignUp;




































// import { Link } from "react-router-dom";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import logo from "../assets/img/logo.jpg";

// function SignUp() {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//   });

//   // validations
//   const [validation, setValidation] = useState({});

//   function Validation(formData) {
//     const errors = {}; // Use an object for error messages

//     // Email validation (combined checks and more specific message)
//     if (
//       formData.email === "" ||
//       !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
//     ) {
//       errors.email = "Please enter a valid email address.";
//     }

//     // Password validation (existing logic)
//     if (formData.password === "") {
//       errors.password = "Password is required.";
//     }

//     // Optional: Username validation (example with a regular expression)
//     if (formData.username && !/^[a-zA-Z0-9_.]+$/.test(formData.username)) {
//       errors.username =
//         "Username can only contain letters, numbers, underscores, and periods.";
//     }

//     return errors;
//   }

//   const handleChange = (event) => {
//     setFormData({ ...formData, [event.target.name]: event.target.value });
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setValidation(Validation(formData));

//     // Handle successful signup
//     try {
//       const url = import.meta.env.VITE_BASE_URL;
//       const response = await axios.post(`${url}/api/signUp`, formData);
//       toast.success("Signup successful!", {
//         position: "top-right",
//         autoClose: 1000,
//         onClose: () => navigate("/login"), // Navigate after the toast is closed
//       });
      
//     } catch (error) {
//       // Handle error
//       console.error(error);
//     }
//   };

//   return (
//     <div className="bg-slate-200 min-h-screen flex justify-center items-center md:flex">
//       <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
//       <Link to='/'>
//             <img src={logo} alt=""
//             className="md:h-14 md:w-22 h-10 ml-[3.5rem]" />
//           </Link>
//         <h2 className="text-xl font-semibold text-gray-800 mb-2">
//           Create Your Account
//         </h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label htmlFor="username" className="block text-sm font-semibold mb-2">
//               Username
//             </label>
//             <input
//               type="text"
//               id="username"
//               name="username"
//               onChange={handleChange}
//               className="border border-gray-300 rounded px-3 py-2 w-full"
//             />
//             {validation.username && (
//               <p className="text-red-500 text-xs mt-1">{validation.username}</p>
//             )}
//           </div>
//           <div className="mb-4">
//             <label htmlFor="email" className="block text-sm font-semibold mb-2">
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               onChange={handleChange}
//               className="border border-gray-300 rounded px-3 py-2 w-full"
//             />
//             {validation.email && (
//               <p className="text-red-500 text-xs mt-1">{validation.email}</p>
//             )}
//           </div>
//           <div className="mb-4">
//             <label htmlFor="password" className="block text-sm font-semibold mb-2">
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               onChange={handleChange}
//               className="border border-gray-300 rounded px-3 py-2 w-full"
//             />
//             {validation.password && (
//               <p className="text-red-500 text-xs mt-1">{validation.password}</p>
//             )}
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-[#90CCBA] hover:bg-[#46c79f] text-white font-semibold py-2 px-4 rounded transition duration-200"
//           >
//             Sign up
//           </button>
//         </form>
//         <div className="mt-4 text-center">
//           <p className="text-gray-600 text-sm">
//             Already have an account?{" "}
//             <Link to="/login" className="text-teal-500 font-semibold">
//               Log in
//             </Link>
//           </p>
//         </div>
//       </div>
//       <ToastContainer />
//     </div>
//   );
// }

// export default SignUp;



