import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import EventsList from '../ComponentEvents/EventsList';
import axios from 'axios';
import Loading from '../components/Loading';
import Footer from '../components/Footer';

const Events = () => {
  const { selectedLocation: locationFromUrl } = useParams();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState(locationFromUrl || '');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const url = import.meta.env.VITE_BASE_URL;
        let response;

        if (selectedLocation) {
          const encodedLocation = encodeURIComponent(selectedLocation);
          response = await axios.get(`${url}/api/events/location/${encodedLocation}`);
        } else {
          response = await axios.get(`${url}/api/events`);
        }

        setEvents(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching events:', error);
        setLoading(false);
      }
    };
    fetchEvents();
  }, [selectedLocation]);

  const handleSelectLocation = (location) => {
    setSelectedLocation(location);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Navbar />
      <EventsList events={events} onSelectLocation={handleSelectLocation} selectedLocation={selectedLocation} />
      {/* <Footer /> */}
    </>
  );
};

export default Events;