import React, { useEffect } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import Switzerland from "../assets/img/Holiday1.png"
import Hongkong from "../assets/img/Holiday2.png"
import southkorea from "../assets/img/Holiday3.png"
import greece from "../assets/img/Holiday4.png"
import france from "../assets/img/Holiday6.png"
import dubai from "../assets/img/Holiday9.png"
import abudhabi from "../assets/img/Holiday10.png"


const NextArrow = ({ onClick }) => (
  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 cursor-pointer text-white hover:text-[#46c79f] z-10">
    <FaChevronRight className="text-3xl" onClick={onClick} />
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 cursor-pointer text-white hover:text-[#46c79f] z-10">
    <FaChevronLeft className="text-3xl" onClick={onClick} />
  </div>
);

const TopHolidayPackages = ({selectedLocation,setHoliday})=> {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHolidayPackages = async () => {
      try {
        if (selectedLocation) {
          const url = import.meta.env.VITE_BASE_URL;
          const response = await axios.get(`${url}/api/holidaypackages/location/${selectedLocation}`);
          setHoliday(response.data); // Set holiday state with response.data
          console.log(response.data);
        }
      } catch (error) {
        console.error("Error fetching holiday packages:", error);
      }
    };

    fetchHolidayPackages();
  }, [selectedLocation,setHoliday]);


  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="container mx-auto px-4 py-4 relative">
      <h1 className="text-2xl font-bold mb-4">Top Holiday Packages</h1>
      <Slider {...settings}>
        {/* ... (image slides) */}


        <div className="px-2">
        <button onClick={()=>{navigate(`/holidaypackages/location/Switzerland`);}}>
          <img
            src={Switzerland}
            alt="Image 1"
            className='object-cover md:w-full w-[21.2rem] md:h-[21rem] h-[30rem] transition duration-300 transform hover:scale-110 rounded-xl'
          />
          </button>
        </div>
        <div className="px-2">
        <button onClick={()=>{navigate(`/holidaypackages/location/Hong Kong`);}}>
          <img
            src={Hongkong}
            alt="Image 2"
            className="rounded-xl object-cover md:w-full w-[21.2rem] md:h-[21rem] h-[30rem] transition duration-300 transform hover:scale-110"
          />
          </button>
        </div>
        <div className="px-2">
        <button onClick={()=>{navigate(`/holidaypackages/location/South Korea`);}}>
          <img
            src={southkorea}
            alt="Image 3"
            className="rounded-xl object-cover md:w-full w-[21.2rem] md:h-[21rem] h-[30rem] transition duration-300 transform hover:scale-110"
          />
          </button>
        </div>
        <div className="px-2">
        <button onClick={()=>{navigate(`/holidaypackages/location/Greece`);}}>
          <img
            src={greece}
            alt="Image 4"
            className="rounded-xl object-cover md:w-full w-[21.2rem] md:h-[21rem] h-[30rem] transition duration-300 transform hover:scale-110"
          />
          </button>
        </div>
        {/* <div className="px-2">
          <img
            src="src/assets/img/Holiday5.png"
            alt="Image 5"
            className="rounded-xl object-cover w-full h-[21rem] transition duration-300 transform hover:scale-110"
          />
        </div> */}
        <div className="px-2">
        <button onClick={()=>{navigate(`/holidaypackages/location/France`);}}>
          <img
            src={france}
            alt="Image 6"
            className="rounded-xl object-cover md:w-full w-[21.2rem] md:h-[21rem] h-[30rem] transition duration-300 transform hover:scale-110"
          />
          </button>
        </div>
        {/* <div className="px-2">
          <img
            src="src/assets/img/Holiday7.png"
            alt="Image 7"
            className="rounded-xl object-cover w-full h-[21rem] transition duration-300 transform hover:scale-110"
          />
        </div>
        <div className="px-2">
          <img
            src="src/assets/img/Holiday8.png"
            alt="Image 8"
            className="rounded-xl object-cover w-full h-[21rem] transition duration-300 transform hover:scale-110"
          />
        </div> */}
        <div className="px-2">
        <button onClick={()=>{navigate(`/holidaypackages/location/Dubai`);}}>
          <img
            src={dubai}
            alt="Image 9"
            className="rounded-xl object-cover md:w-full w-[21.2rem] md:h-[21rem] h-[30rem] transition duration-300 transform hover:scale-110"
          />
          </button>
        </div>
        <div className="px-2">
        <button onClick={()=>{navigate(`/holidaypackages/location/Abu Dhabi`);}}>
          <img
            src={abudhabi}
            alt="Image 10"
            className="rounded-xl object-cover md:w-full w-[21.2rem] md:h-[21rem] h-[30rem] transition duration-300 transform hover:scale-110"
          />
          </button>
        </div>
      
      </Slider>
    </div>
  );
}

export default TopHolidayPackages;










//final
// import React from 'react';
// import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// const NextArrow = ({ onClick }) => (
//   <div className="absolute right-0 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600 hover:text-gray-800">
//     <FaChevronRight className="text-3xl" onClick={onClick} />
//   </div>
// );

// const PrevArrow = ({ onClick }) => (
//   <div className="absolute left-0 top-1/2 transform -translate-y-1/2 cursor-pointer text-pink-600 hover:text-gray-800">
//     <FaChevronLeft className="text-3xl" onClick={onClick} />
//   </div>
// );

// function TopHolidayPackages() {
//   const settings = {
//     dots: false,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 5,
//     slidesToScroll: 1,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 3,
//           slidesToScroll: 1,
//         },
//       },
//       {
//         breakpoint: 768,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 1,
//         },
//       },
//       {
//         breakpoint: 480,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//         },
//       },
//     ],
//     nextArrow: <NextArrow />,
//     prevArrow: <PrevArrow />,
//   };

//   return (
//     <div className="container mx-auto px-4 py-4 relative">
//       <h1 className="text-2xl font-bold mb-4">Popular Destinations</h1>
//       <Slider {...settings}>
        // <div className="px-2">
        //   <img
        //     src="src/assets/img/Holiday1.png"
        //     alt="Image 1"
        //     className="rounded-xl object-cover w-full h-[21rem] transition duration-300 transform hover:scale-110"
        //   />
        // </div>
        // {/* Add more image slides here */}


        // <div className="px-2">
        //   <img
        //     src="src/assets/img/Holiday2.png"
        //     alt="Image 2"
        //     className="rounded-xl object-cover w-full h-[21rem] transition duration-300 transform hover:scale-110"
        //   />
        // </div>
        // <div className="px-2">
        //   <img
        //     src="src/assets/img/Holiday3.png"
        //     alt="Image 3"
        //     className="rounded-xl object-cover w-full h-[21rem] transition duration-300 transform hover:scale-110"
        //   />
        // </div>
        // <div className="px-2">
        //   <img
        //     src="src/assets/img/Holiday4.png"
        //     alt="Image 4"
        //     className="rounded-xl object-cover w-full h-[21rem] transition duration-300 transform hover:scale-110"
        //   />
        // </div>
        // <div className="px-2">
        //   <img
        //     src="src/assets/img/Holiday5.png"
        //     alt="Image 5"
        //     className="rounded-xl object-cover w-full h-[21rem] transition duration-300 transform hover:scale-110"
        //   />
        // </div>
        // <div className="px-2">
        //   <img
        //     src="src/assets/img/Holiday6.png"
        //     alt="Image 6"
        //     className="rounded-xl object-cover w-full h-[21rem] transition duration-300 transform hover:scale-110"
        //   />
        // </div>
        // <div className="px-2">
        //   <img
        //     src="src/assets/img/Holiday6.png"
        //     alt="Image 7"
        //     className="rounded-xl object-cover w-full h-[21rem] transition duration-300 transform hover:scale-110"
        //   />
        // </div>
        // <div className="px-2">
        //   <img
        //     src="src/assets/img/Holiday6.png"
        //     alt="Image 8"
        //     className="rounded-xl object-cover w-full h-[21rem] transition duration-300 transform hover:scale-110"
        //   />
        // </div>
        // <div className="px-2">
        //   <img
        //     src="src/assets/img/Holiday6.png"
        //     alt="Image 9"
        //     className="rounded-xl object-cover w-full h-[21rem] transition duration-300 transform hover:scale-110"
        //   />
        // </div>
        // <div className="px-2">
        //   <img
        //     src="src/assets/img/Holiday6.png"
        //     alt="Image 10"
        //     className="rounded-xl object-cover w-full h-[21rem] transition duration-300 transform hover:scale-110"
        //   />
        // </div>
        // <div className="px-2">
        //   <img
        //     src="src/assets/img/Holiday6.png"
        //     alt="Image 11"
        //     className="rounded-xl object-cover w-full h-[21rem] transition duration-300 transform hover:scale-110"
        //   />
        // </div>
        
//       </Slider>
//     </div>
//   );
// }

// export default TopHolidayPackages;



