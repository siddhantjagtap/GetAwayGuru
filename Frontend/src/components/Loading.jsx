import React from 'react';
import loadinggif from "../assets/img/Ghost.gif"

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <img src={loadinggif} alt="Loading" height={100} width={100} />
    </div>
  );
};

export default Loading;
