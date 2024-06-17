import { CgProfile } from "react-icons/cg";
import { FaCartPlus, FaBars, FaTimes } from "react-icons/fa";
import { useContext, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/img/logo.jpg";
import { AuthContext } from "../Context/Auth_Context";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside);
  
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="bg-white text-gray-900 z-50 w-full">
      <header className="container mx-auto md:py-2 md:px-6 py-2 px-2 flex items-center justify-between">
        <div className="flex items-center">
          <Link to='/'>
            <img src={logo} alt=""
            className="md:h-16 md:w-22 h-[3rem]" />
          </Link>
        
          <nav className="hidden md:flex md:ml-[18vw]"> 
            <div className="flex gap-10 font-semibold text-gray-900">
              <Link to="/" className="text-black hover:text-[#46c79f] ">
              Home
              </Link> 
              <Link to="/holidaypackages" className="text-black hover:text-[#46c79f]">
              Holiday Packages
              </Link>
              <Link to="/events" className="text-black hover:text-[#46c79f]">
                Events
              </Link>
              <Link to="/contact" className="text-black hover:text-[#46c79f]">
                Contact Us
              </Link>
             
            </div>
          </nav>
        </div>
        <div className="md:hidden text-gray-900">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="focus:outline-none"
          >
            {mobileMenuOpen ? (
              <FaTimes className="text-xl" />
            ) : (
              <FaBars className="text-xl" />
            )}
          </button>
        </div>
        <nav className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="relative inline-block text-left">
              <div className="flex items-center">
                                
                <button
                    onClick={toggleDropdown}
                    className="focus:outline-none ml-2 mr-[1rem]"
                >
                    <CgProfile className="h-[2rem] w-[1.4rem]" style={{ width: '1.7rem', height: '1.7rem' }} />
                </button>

              </div>
             {dropdownOpen && (
                  <div
                    className="absolute right-0 z-10 mt-2 w-[12rem] h-[4rem] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                    tabIndex="-1"
                    ref={dropdownRef}
                  >
                  <div>
                    <Link
                      to="/profile"
                      className="text-gray-700 w-full px-6 py-2 text-left text-sm transition-transform transform-gpu hover:scale-105 hover:text-black"
                      role="menuitem"
                      tabIndex="-1"
                      id="menu-item-0"
                    >
                      {/* Profile */}
                      {user?.username}
                    </Link>
                    <br />
                    <Link to="/" >
                    <button
                      onClick={logout}
                      className="text-gray-700 w-full px-6 py-2 text-left text-sm transition-transform transform-gpu hover:scale-105 hover:text-red-400"
                      role="menuitem"
                      tabIndex="-1"
                      id="menu-item-3"
                    >
                      Logout
                    </button>

                    </Link>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" >
              <button
                className="bg-[#90CCBA] hover:bg-[#46c79f] flex items-center justify-center text-white font-bold py-2 md:px-8 px-[6px] rounded transition-colors duration-300">                
               Login
              </button>
            </Link>
          )}
        </nav>
      </header>

      <div
        className={`fixed inset-0 z-50 overflow-hidden transition-transform duration-300 ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div
          className={`absolute inset-0 bg-gray-900 opacity-50 transition-opacity duration-300 ${mobileMenuOpen ? "opacity-50" : "opacity-0"
            }`}
          onClick={() => setMobileMenuOpen(false)}
        ></div>
        <div
          className={`absolute left-0 w-3/4 max-w-xs h-screen bg-white shadow-lg transition-transform duration-300 ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
        >
          <div className="px-4 py-6 space-y-2">
            <Link to="/profile">
              <div className="flex items-center mb-4">
                <div className="bg-gray-800 rounded-full w-12 h-12 flex items-center justify-center text-white font-semibold text-[8vw] pb-[1vw] mr-4">
                  {user?.username?.charAt(0)}
                </div>
                <p className="font-bold text-base">{user?.username}</p>
              </div>
            </Link>
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100 transition duration-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/holidaypackages"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100 transition duration-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              Holiday Packages
            </Link>
            <Link
              to="/events"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100 transition duration-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              Events
            </Link>
            <Link
              to="/bookinghistory"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100 transition duration-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              Order History
            </Link>
                      
            {user ? (
              <Link to="/" >
              <button
                onClick={logout}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100 transition duration-300"
                role="menuitem"
                tabIndex="-1"
                id="menu-item-3"
              >
                Logout
              </button>
              </Link>
            
            ) : (
              <Link
                onClick={() => setMobileMenuOpen(false)}
                to="/login"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100 transition duration-300"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;

