import React, { useState } from 'react';
import { FaLandmark } from 'react-icons/fa';
import { MdLocationCity } from 'react-icons/md';
import { GiMonumentValley } from 'react-icons/gi';
import { AiOutlineHome } from 'react-icons/ai';
import { BiBuildingHouse } from 'react-icons/bi';
import { IoIosArrowDown } from 'react-icons/io';

const DropdownEvents = ({ onSelectLocation, selectedLocation }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectLocation = (location) => {
    onSelectLocation(location);
    setIsOpen(false); // Close the dropdown after selecting an item
  };

  const locations = [
    // { name: 'All ', icon: <AiOutlineHome /> },
    { name: 'Mumbai', icon: <FaLandmark /> },
    { name: 'Delhi', icon: <MdLocationCity /> },
    { name: 'Pune', icon: <GiMonumentValley /> },
    { name: 'Chandigarh', icon: <BiBuildingHouse /> },
    { name: 'Bengaluru', icon: <FaLandmark /> },
  ];

  return (
    <div className="relative z-40">
      <button
        className="bg-white hover:bg-teal-500 hover:text-white text-teal-600 py-2 px-4 border border-gray-400 rounded-full flex items-center"
        onClick={toggleDropdown}
      >
        {selectedLocation || 'Location'}
        <IoIosArrowDown className="ml-1" />
      </button>
      {isOpen && (
        <ul className="absolute mt-2 w-[11rem] bg-white border border-gray-400 rounded-lg shadow-lg">
          {locations.map((location, index) => (
            <li
              key={index}
              className="flex items-center px-4 py-2 cursor-pointer hover:bg-teal-500 hover:text-white"
              onClick={() => handleSelectLocation(location.name)}
            >
              {location.icon}
              <span className="ml-2">{location.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropdownEvents;
