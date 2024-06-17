import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ImLocation2 } from 'react-icons/im';

const EventsCard = ({ event, selectedCategory }) => {
  const [expanded, setExpanded] = useState(false);
  const facilities = typeof event.Facilities === 'string' ? event.Facilities.split(',') : [event.Facilities];
  const visibleFacilities = expanded ? facilities : facilities.slice(0, 3);
  const formattedEventName = event.Event_Name.replace(/ /g, '-');
  const handleToggleExpand = (e) => {
    e.preventDefault();
    setExpanded(!expanded);
  };
  const shouldRenderCard =
    selectedCategory === '' ||
    event.Event_Category.toLowerCase() === selectedCategory.toLowerCase();

  if (!shouldRenderCard) {
    return null; // Don't render the card if the category doesn't match
  }

  return (
    
    <Link to={`/events/${formattedEventName}`} className="block">
      <div
        className={`bg-white w-[20rem] md:w-[19rem] md:mb-[3rem] md:m-0 m-4 h-[36rem] shadow font-poppins rounded-lg overflow-hidden mb-4 transition-all duration-300 transform hover:scale-105 hover:bg-gray-100 ${
          expanded ? 'md:h-auto' : 'md:h-[39rem]'
        }`}
      >
        <div className="h-auto mt-2 md:ml-2 ml-[1.5rem] rounded-lg w-full mr-2 md:mt-0 mt-[2rem]">
          <img
            src={event.Card_Img}
            alt={event.Event_Name}
            className="md:object-center w-[16rem] h-[21rem] md:h-[25rem] md:w-[17rem] md:pt-2 rounded m-2"
          />
        </div>
        <div className="p-4 flex flex-col w-full md:ml-0 ml-[1.5rem] ">
          <h2 className="text-xl font-semibold mb-2 text-black">{event.Event_Name}</h2>
          <p className="text-sm mb-2 text-gray-500">{event.Event_Category}</p>
          <div className="flex items-center mb-2">
            <ImLocation2 className="text-1xl mt-[4px] mr-2" />
            <p className="text-black">{event.Location}</p>
          </div>
          
          <p className='text-gray-500 font-semibold mb-2 text-black'>{event.Venue_addr}</p>
            <p className="text-gray-500 text-lg "> ₹ {event.Price} onwards</p>

        </div>
      </div>
    </Link>
    
  );
};

export default EventsCard;
