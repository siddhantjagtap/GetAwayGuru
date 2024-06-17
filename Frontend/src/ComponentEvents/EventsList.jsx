import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import EventsCard from './EventsCard';
import DropdownEvents from './DropdownEvents';

const EventsList = ({ events }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setSelectedCategory(''); // Reset the category when location changes
  };

  const filteredEvents = events.filter((event) => {
    const categoryMatch =
      selectedCategory && event.Event_Category.toLowerCase() === selectedCategory.toLowerCase();
    const locationMatch = selectedLocation === 'All Locations' || event.Location.toLowerCase() === selectedLocation.toLowerCase();
    return locationMatch && (!selectedCategory || categoryMatch);
  });

  return (
    <div className="container mx-auto font-poppins px-4 py-4 md:pl-[9rem] md:pr-[5rem] md:pt-[2rem]">
      <div className="mb-4 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <button
            className={`py-2 px-4 border border-gray-400 rounded-full transition-colors duration-300 mb-2 md:mb-0 md:mr-2 ${
              selectedCategory === 'comedy shows'
                ? 'bg-teal-500 text-white'
                : 'bg-white text-teal-600 hover:bg-teal-500 hover:text-white'
            }`}
            onClick={() => handleCategorySelect('comedy shows')}
          >
            Comedy Shows
          </button>
          <button
            className={`py-2 px-4 md:ml-0 ml-4 border border-gray-400 rounded-full transition-colors duration-300 ${
              selectedCategory === 'music shows'
                ? 'bg-teal-500 text-white'
                : 'bg-white text-teal-600 hover:bg-teal-500 hover:text-white'
            }`}
            onClick={() => handleCategorySelect('music shows')}
          >
            Music Shows
          </button>
        </div>
        <DropdownEvents onSelectLocation={handleLocationSelect} selectedLocation={selectedLocation} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:ml-0 ">
        {Array.isArray(filteredEvents) &&
          filteredEvents.map((event) => (
            <Link key={event._id} to={`/events/${event.Event_Name.toLowerCase().replace(/\s+/g, '-')}`}>
              <EventsCard event={event} selectedCategory={selectedCategory} />
            </Link>
          ))}
      </div>
    </div>
  );
};

export default EventsList;
