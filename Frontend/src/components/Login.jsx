import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Context/Auth_Context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../assets/img/logo.jpg";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [validation, setValidation] = useState({});

  function Validation(formData) {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errors.email = "Enter email in correct format";
    } else if (formData.email === "") {
      errors.email = "Email is required";
    }
    if (formData.password === "") {
      errors.password = "Password is required";
    }
    return errors;
  }

  const { login } = useContext(AuthContext);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = Validation(formData);
    setValidation(errors);

    if (Object.keys(errors).length === 0) {
      try {
        const url = import.meta.env.VITE_BASE_URL;
        const response = await axios.post(`${url}/api/login`, formData);
        const { token, user } = response.data;
        localStorage.setItem("token", token);
        login({ user, token });
        toast.success("Login successful!", {
          style: {
            backgroundColor: 'green',
            color: 'white'
          },
          position: "top-right",
          autoClose: 1000,
          onClose: () => navigate("/"), // Navigate after the toast is closed
        });
      } catch (error) {
        console.error(error);
        toast.error("Invalid email or password. Please try again.", {
          style: {
            backgroundColor: 'red',
            color: 'white'
          },
          position: "top-right",
          autoClose: 3000,
        });
      }
    } else {
      toast.error("Please correct the errors in the form.", {
        style: {
          backgroundColor: 'red',
          color: 'white'
        },
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="bg-slate-200 min-h-screen flex justify-center items-center md:flex">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg md:ml-0 ml-4 md:mr-0 mr-4">
          <Link to='/'>
            <img src={logo} alt=""
              className="md:h-14 md:w-22 h-10 ml-[3.5rem]" />
          </Link>
          <h2 className="md:text-xl text-mx font-semibold text-gray-800 mb-2">
            Welcome Back!
          </h2>
          <form onSubmit={handleSubmit}>
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
            <div className="flex items-center justify-between mb-4">
              <Link to="/forgot-password" className="text-sm text-gray-600">
                Forgot Password?
              </Link>
            </div>
            <button
              type="submit"
              className="bg-[#90CCBA] hover:bg-[#46c79f] w-full text-white font-semibold py-2 px-4 rounded transition duration-200"
            >
              Log in
            </button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-gray-600 text-sm">
              New User?{" "}
              <Link to="/Signup" className="text-teal-500 font-semibold">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;























// import { Link } from "react-router-dom";
// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { useContext } from "react";
// import { AuthContext } from "../Context/Auth_Context";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import logo from "../assets/img/logo.jpg";

// function Login() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [validation, setValidation] = useState({});

//   function Validation(formData) {
//     const errors = {};
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(formData.email)) {
//       errors.email = "Enter email in correct format";
//     } else if (formData.email === "") {
//       errors.email = "Email is required";
//     }
//     if (formData.password === "") {
//       errors.password = "Password is required";
//     }
//     return errors;
//   }

//   const { login } = useContext(AuthContext);

//   const handleChange = (event) => {
//     setFormData({ ...formData, [event.target.name]: event.target.value });
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const errors = Validation(formData);
//     setValidation(errors);

//     if (Object.keys(errors).length === 0) {
//       try {
//         const url = import.meta.env.VITE_BASE_URL;
//         const response = await axios.post(`${url}/api/login`, formData);
//         const { token, user } = response.data;
//         localStorage.setItem("token", token);
//         login({ user, token });
//         toast.success("Login successful!", {
//           position: "top-right",
//           autoClose: 1000,
//           onClose: () => navigate("/"), // Navigate after the toast is closed
//         });
//       } catch (error) {
//         console.error(error);
//         toast.error("Invalid email or password. Please try again.", {
//           position: "top-right",
//           autoClose: 3000,
//         });
//       }
//     } else {
//       toast.error("Please correct the errors in the form.", {
//         position: "top-right",
//         autoClose: 3000,
//       });
//     }
//   };

//   return (
//     <>
//     <ToastContainer />
//       <div className="bg-slate-200 min-h-screen flex justify-center items-center md:flex">       
//         <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
//             <Link to='/'>
//             <img src={logo} alt=""
//             className="md:h-14 md:w-22 h-10 ml-[3.5rem]" />
//           </Link>
//           <h2 className="md:text-xl text-mx font-semibold text-gray-800 mb-2">
//             Welcome Back!
//           </h2>
//           <form onSubmit={handleSubmit}>
//             <div className="mb-4">
//               <label htmlFor="email" className="block text-sm font-semibold mb-2">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 onChange={handleChange}
//                 className="border border-gray-300 rounded px-3 py-2 w-full"
//               />
//               {validation.email && (
//                 <p className="text-red-500 text-xs mt-1">{validation.email}</p>
//               )}
//             </div>
//             <div className="mb-4">
//               <label htmlFor="password" className="block text-sm font-semibold mb-2">
//                 Password
//               </label>
//               <input
//                 type="password"
//                 id="password"
//                 name="password"
//                 onChange={handleChange}
//                 className="border border-gray-300 rounded px-3 py-2 w-full"
//               />
//               {validation.password && (
//                 <p className="text-red-500 text-xs mt-1">{validation.password}</p>
//               )}
//             </div>
//             <div className="flex items-center justify-between mb-4">
//               <Link to="/forgot-password" className="text-sm text-gray-600">
//                 Forgot Password?
//               </Link>
//             </div>
//             <button
//               type="submit"
//               className="bg-[#90CCBA] hover:bg-[#46c79f] w-full text-white font-semibold py-2 px-4 rounded transition duration-200"
//             >
//               Log in
//             </button>
//           </form>
//           <div className="mt-4 text-center">
//             <p className="text-gray-600 text-sm">
//               New User?{" "}
//               <Link to="/Signup" className="text-teal-500 font-semibold">
//                 Sign up
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>
      
//     </>
//   );
// }

// export default Login;







