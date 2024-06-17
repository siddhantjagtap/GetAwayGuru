import React from 'react';
import Navbar from './Navbar';
import { ImLocation2 } from "react-icons/im";
import { MdPhoneInTalk } from "react-icons/md";
import { IoMail } from "react-icons/io5";

function ContactUs() {
  return (
    <>
      <Navbar />
      <div className="flex justify-center font-poppins items-center h-screen">
        <div className="flex flex-col md:flex-row  rounded-lg pl-8 pr-8 pb-8">
          {/* Left Side */}
          <div className="md:w-[36rem] md:mt-0 mt-[18rem] md:pr-8 md:ml-[9rem]">
            <h2 className="md:text-2xl text-lg md:ml-0 ml-[5rem]  font-bold mb-4">Contact us</h2>
            <p className="mb-6 text-sm">Feel free to contact us any time. We will get back to you as soon as we can!</p>
            <div className="flex flex-col mb-4">
              <label htmlFor="name" className="mb-2">Name</label>
              <input type="text" id="name" placeholder="Enter Your Name" className="border border-gray-300 p-2 rounded-md" />
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="email" className="mb-2">Email</label>
              <input type="email" id="email" placeholder="Enter Your Email" className="border border-gray-300 p-2 rounded-md" />
            </div>
            <div className="flex flex-col mb-6">
              <label htmlFor="message" className="mb-2">Message</label>
              <textarea id="message" placeholder="Write something..." className="border border-gray-300 p-2 rounded-md h-32"></textarea>
            </div>
            <button className="bg-[#90CCBA] text-white px-4 py-2 rounded-md hover:bg-[#46c79f]">Send</button>
          </div>

          {/* Right Side */}
          <div className="md:w-[23rem] md:h-[25rem] md:ml-[3rem] md:pl-8 md:mt-0 mt-8 bg-[#90CCBA] text-white p-6 rounded">
            <h3 className="text-xl font-bold mb-4">Contact Information</h3>
            <div className="mb-4 flex items-center">
             <MdPhoneInTalk className="text-white mr-2"/> <span>8975641235</span>
            </div>
            <div className="mb-4 flex items-center">
              <IoMail className="text-white mr-2" /> <span>demo@gmail.com</span>
            </div>
            <div className="flex items-center">
            {/* <className="text-1xl  " /> */}
              <ImLocation2  className="text-white mr-2"/><span>123 Juhu Beach Road, Juhu, Mumbai, Maharashtra, India</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactUs;