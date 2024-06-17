import React, { useState } from 'react';

const RoomReserve = ({ roomPrice, quantity, handleIncrement, handleDecrement }) => {
  const totalPrice = roomPrice * quantity;
  return (
    <div className="border shadow-lg h-[19rem] p-5 mt-14 w-[25rem]">
      <p className="text-black mt-3 text-xl mb-2 font-extrabold">₹ {roomPrice}</p>
      <p className="mt-5">per night for 1 room</p>
      <div className="flex items-center mt-4">
        <button onClick={handleDecrement}>-</button>
        <span className="mx-2">{quantity}</span>
        <button onClick={handleIncrement}>+</button>
      </div>
      <p className="text-xl font-semibold mt-3">Total Price: ₹ {totalPrice}</p>
      <br />
      <button className="text-white font-bold w-80 h-10 mb-4 rounded" style={{ backgroundColor: "#90CCBA" }}>
        Reserve Now
      </button>
    </div>
  );
};

export default RoomReserve;