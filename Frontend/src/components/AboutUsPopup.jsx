import React from 'react';

const AboutUsPopup = ({ aboutUs, onClose }) => {
  return (
    <div className="popup">
      <div className="popup-content">
       
        {/* <h1>About Us</h1> */}
        <p>{aboutUs}</p>
        <button onClick={onClose} className="close-btn text-red-600">Close</button>
      </div>
    </div>
  );
};

export default AboutUsPopup;
