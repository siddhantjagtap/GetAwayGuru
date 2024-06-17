import React from "react";

function RoomCard({ hotel, setSelectedRoom }) {
  const handleReserveRoom = (roomType, price) => {
    const selectedRoomData = {
      roomType,
      price,
    };
    setSelectedRoom(selectedRoomData);
  };

  return (
    <>
        <div className="md:p-9 md:ml-[5rem]">
          {/* Desktop View */}
          <div className="hidden md:block">
            {/* Render Deluxe Room */}


            <div className="transform transition-transform duration-300 hover:scale-105 hover:bg-gray-200 bg-white mb-4 h-[14rem] w-[95%] shadow font-poppins rounded-lg overflow-hidden flex flex-col md:flex-row">
              
              
            <img
              src={hotel.Type1_Img}
              className="w-[30%] h-48 object-cover item-center rounded-lg m-[1rem]"
            />
            <div className="py-4 flex ">
              <div className="flex items-center ">
                <div className="ml-4 w-[280px]">
                  <h1 className="text-2xl font-bold">{hotel.Room_Type_1}</h1>


                  <div className="text-sm mt-2">
                    <ul className="list-disc pl-5">
                    {hotel.Facilities_Type_1.split("\n").map((facility, index) => (
                      <li key={index}>{facility}</li>
                    ))}
                  </ul>
                </div>

                <div className="text-gray-600 font-semibold mt-3 text-emerald-400 mr-[2rem]">
                  <p className={`mt-2 ml-1 mb-2 ${hotel.Refund_Status === 'Refundable' ? 'text-black' : 'text-red-500'}`}>
                    {hotel.Refund_Status}
                  </p>
                  
                </div>
                </div>
                <div className="ml-[8rem] justify-end ">
                  <p className="text-black mt-3 text-xl mb-2 font-extrabold">
                  ₹ {hotel.Type1_Price}
                  </p>
                  <p className='text-black text-sm mb-2 '>+₹1020 taxes</p>
                  <p className='text-black text-sm mb-2 '>per night for 1 room</p>

            
            <button
              className="bg-[#90CCBA] hover:bg-[#46c79f] text-white font-medium w-[11rem] h-10 rounded"
              onClick={() => handleReserveRoom("Room_Type_1", hotel.Type1_Price)}
            >
              Reserve room
            </button>
          </div>
          </div>
        </div>
      </div>

            {/* Render Standard Room */}
            <div className="transform transition-transform duration-300 hover:scale-105 hover:bg-gray-200 bg-white h-[14rem] w-[95%] shadow font-poppins rounded-lg overflow-hidden flex flex-col md:flex-row">
              {/* ... */}
          

              <img
              src={hotel.Type2_Img}
              className="w-[30%] h-48 object-cover item-center rounded-lg m-[1rem]"
            />
             <div className="py-4 flex ">
              <div className="flex items-center ">
                <div className="ml-4 w-[280px]">
                  <h1 className="text-2xl font-bold">{hotel.Room_Type_2}</h1>


                  <div className="text-sm mt-2">
                    <ul className="list-disc pl-5">
                    {hotel.Facilities_Type_2.split("\n").map((facility, index) => (
                      <li key={index}>{facility}</li>
                    ))}
                  </ul>
                </div>

                
                <div className="text-gray-600 font-semibold mt-3 text-emerald-400 mr-[2rem]">
                  <p className={`mt-2 ml-1 mb-2 ${hotel.Refund_Status === 'Refundable' ? 'text-black' : 'text-red-500'}`}>
                    {hotel.Refund_Status}
                  </p>
                </div>  
                </div>
                <div className="ml-[8rem] justify-end ">
                  <p className="text-black mt-3 text-xl mb-2 font-extrabold">
                  ₹ {hotel.Type2_Price}
                  </p>
                  <p className='text-black text-sm mb-2 '>+₹1020 taxes</p>
                  <p className='text-black text-sm mb-2 '>per night for 1 room</p>

            <button
              className="bg-[#90CCBA] hover:bg-[#46c79f] text-white font-medium w-[11rem] h-10 rounded"
              
              onClick={() => handleReserveRoom("Room_Type_2", hotel.Type2_Price)}
            >
              Reserve room
            </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    </div>



      {/* Mobile View */}
      <div className="md:hidden ">
        <h1 className="font-bold text-2xl mt-4 ml-2 mb-2">Rooms</h1>
        {/* Render Deluxe Room */}
        <div onClick={() => handleReserveRoom("Room_Type_1", hotel.Type1_Price)} 
             className="transform transition-transform duration-300 hover:scale-105 hover:bg-gray-200 bg-white mb-4 h-auto w-[20rem] ml-[1rem] shadow font-poppins rounded-lg overflow-hidden flex flex-col md:flex-row">
          {/* ... */}          
        <img
          src={hotel.Type1_Img}
          className="w-[18rem] h-[11rem] object-cover items-center rounded-lg m-[1rem]"
        />
        <div className="py-4 flex ">
          <div className="flex items-center ">
            <div className="ml-4 w-[280px]">
              <h1 className="text-2xl font-bold">{hotel.Room_Type_1}</h1>


              <div className="text-sm mt-2">
                <ul className="list-disc pl-5">
                {hotel.Facilities_Type_1.split("\n").map((facility, index) => (
                  <li key={index}>{facility}</li>
                ))}
              </ul>
            </div>

            <div className="text-gray-600 font-semibold mt-3 text-emerald-400 mr-[2rem]">
              <p className={`mt-2 ml-1 mb-2 ${hotel.Refund_Status === 'Refundable' ? 'text-black' : 'text-red-500'}`}>
                {hotel.Refund_Status}
              </p>
              <p className="text-black mt-3 text-xl mb-2 font-extrabold">
              ₹ {hotel.Type1_Price}
              </p>
             </div>
            </div>
            {/* <div className="ml-[8rem] justify-end ">
              
              <p className='text-black text-sm mb-2 '>+₹1020 taxes</p>
              <p className='text-black text-sm mb-2 '>per night for 1 room</p>
       </div> */}
      </div>
     </div>
    </div>



        {/* Render Standard Room */}
        <div onClick={() => handleReserveRoom("Room_Type_2", hotel.Type2_Price)}
        className="transform transition-transform duration-300 hover:scale-105 hover:bg-gray-200 bg-white mb-4 h-auto w-[20rem] ml-[1rem] shadow font-poppins rounded-lg overflow-hidden flex flex-col md:flex-row">
                
        <img
          src={hotel.Type2_Img}
          className="w-[18rem] h-[11rem] object-cover items-center rounded-lg m-[1rem]"
        />
       <div className="py-4 flex ">
          <div className="flex items-center ">
            <div className="ml-4 w-[280px]">
              <h1 className="text-xl font-bold">{hotel.Room_Type_2}</h1>


              <div className="text-sm mt-2">
                <ul className="list-disc pl-5">
                {hotel.Facilities_Type_2.split("\n").map((facility, index) => (
                  <li key={index}>{facility}</li>
                ))}
              </ul>
            </div>

            
            <div className="text-gray-600 font-semibold mt-3 text-emerald-400 mr-[2rem]">
              <p className={`mt-2 ml-1 mb-2 ${hotel.Refund_Status === 'Refundable' ? 'text-black' : 'text-red-500'}`}>
                {hotel.Refund_Status}
              </p>
              <p className="text-black mt-3 text-xl mb-2 font-extrabold">
              ₹ {hotel.Type2_Price}
              </p>
            </div>  
            </div>
            <div className="ml-[8rem] justify-end ">
              {/* <p className="text-black mt-3 text-xl mb-2 font-extrabold">
              ₹ {hotel.Type2_Price}
              </p> */}
              {/* <p className='text-black text-sm mb-2 '>+₹1020 taxes</p>
              <p className='text-black text-sm mb-2 '>per night for 1 room</p> */}

        <button
          className="bg-[#90CCBA] hover:bg-[#46c79f]text-white font-medium w-[11rem] h-10 rounded "          
          onClick={() => handleReserveRoom("Room_Type_2", hotel.Type2_Price)}
        >
          Reserve room
        </button>
         </div>
       </div>
      </div>
    </div>

  </div>
   
   </>
  );
}

export default RoomCard;

























//final
// import React from "react";

// function RoomCard({ hotel, setSelectedRoom }) {
//   const handleReserveRoom = (roomType, price) => {
//     const selectedRoomData = {
//       roomType,
//       price,
//     };
//     setSelectedRoom(selectedRoomData);
//   };

//   return (
//     <>
//         <div className="md:p-9 md:ml-[5rem]">
//           {/* Desktop View */}
//           <div className="hidden md:block">
//             {/* Render Deluxe Room */}


//             <div className="bg-white mb-4 h-[14rem] w-[95%] shadow font-poppins rounded-lg overflow-hidden flex flex-col md:flex-row">
//               {/* ... */}
              
//             <img
//               src={hotel.Type1_Img}
//               className="w-[30%] h-48 object-cover item-center rounded-lg m-[1rem]"
//             />
//             <div className="py-4 flex ">
//               <div className="flex items-center ">
//                 <div className="ml-4 w-[280px]">
//                   <h1 className="text-2xl font-bold">{hotel.Room_Type_1}</h1>


//                   <div className="text-sm mt-2">
//                     <ul className="list-disc pl-5">
//                     {hotel.Facilities_Type_1.split("\n").map((facility, index) => (
//                       <li key={index}>{facility}</li>
//                     ))}
//                   </ul>
//                 </div>

//                 <div className="text-gray-600 font-semibold mt-3 text-emerald-400 mr-[2rem]">
//                   <p className={`mt-2 ml-1 mb-2 ${hotel.Refund_Status === 'Refundable' ? 'text-black' : 'text-red-500'}`}>
//                     {hotel.Refund_Status}
//                   </p>
                  
//                 </div>
//                 </div>
//                 <div className="ml-[8rem] justify-end ">
//                   <p className="text-black mt-3 text-xl mb-2 font-extrabold">
//                   ₹ {hotel.Type1_Price}
//                   </p>
//                   <p className='text-black text-sm mb-2 '>+₹1020 taxes</p>
//                   <p className='text-black text-sm mb-2 '>per night for 1 room</p>

            
//             <button
//               className="bg-[#90CCBA] hover:bg-[#46c79f] text-white font-medium w-[11rem] h-10 rounded"
//               onClick={() => handleReserveRoom("Room_Type_1", hotel.Type1_Price)}
//             >
//               Reserve room
//             </button>
//           </div>
//           </div>
//         </div>
//       </div>

//             {/* Render Standard Room */}
//             <div className="bg-white h-[14rem] w-[95%] shadow font-poppins rounded-lg overflow-hidden flex flex-col md:flex-row">
//               {/* ... */}
          

//               <img
//               src={hotel.Type2_Img}
//               className="w-[30%] h-48 object-cover item-center rounded-lg m-[1rem]"
//             />
//              <div className="py-4 flex ">
//               <div className="flex items-center ">
//                 <div className="ml-4 w-[280px]">
//                   <h1 className="text-2xl font-bold">{hotel.Room_Type_2}</h1>


//                   <div className="text-sm mt-2">
//                     <ul className="list-disc pl-5">
//                     {hotel.Facilities_Type_2.split("\n").map((facility, index) => (
//                       <li key={index}>{facility}</li>
//                     ))}
//                   </ul>
//                 </div>

                
//                 <div className="text-gray-600 font-semibold mt-3 text-emerald-400 mr-[2rem]">
//                   <p className={`mt-2 ml-1 mb-2 ${hotel.Refund_Status === 'Refundable' ? 'text-black' : 'text-red-500'}`}>
//                     {hotel.Refund_Status}
//                   </p>
//                 </div>  
//                 </div>
//                 <div className="ml-[8rem] justify-end ">
//                   <p className="text-black mt-3 text-xl mb-2 font-extrabold">
//                   ₹ {hotel.Type2_Price}
//                   </p>
//                   <p className='text-black text-sm mb-2 '>+₹1020 taxes</p>
//                   <p className='text-black text-sm mb-2 '>per night for 1 room</p>

//             <button
//               className="bg-[#90CCBA] hover:bg-[#46c79f] text-white font-medium w-[11rem] h-10 rounded"
              
//               onClick={() => handleReserveRoom("Room_Type_2", hotel.Type2_Price)}
//             >
//               Reserve room
//             </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>

//     </div>



//       {/* Mobile View */}
//       <div className="md:hidden ">
//         <h1 className="font-bold text-xl mt-4 ml-4">Rooms</h1>
//         {/* Render Deluxe Room */}
//         <div onClick={() => handleReserveRoom("Room_Type_1", hotel.Type1_Price)} className="bg-white mb-4 h-[28rem] w-[17rem] ml-[0.5rem] shadow font-poppins rounded-lg overflow-hidden flex flex-col md:flex-row">
//           {/* ... */}          
//         <img
//           src={hotel.Type1_Img}
//           className="w-[15rem] h-[13rem] object-cover items-center rounded-lg m-[1rem]"
//         />
//         <div className="py-4 flex ">
//           <div className="flex items-center ">
//             <div className="ml-4 w-[280px]">
//               <h1 className="text-xl font-bold">{hotel.Room_Type_1}</h1>


//               <div className="text-sm mt-2">
//                 <ul className="list-disc pl-5">
//                 {hotel.Facilities_Type_1.split("\n").map((facility, index) => (
//                   <li key={index}>{facility}</li>
//                 ))}
//               </ul>
//             </div>

//             <div className="text-gray-600 font-semibold mt-3 text-emerald-400 mr-[2rem]">
//               <p className={`mt-2 ml-1 mb-2 ${hotel.Refund_Status === 'Refundable' ? 'text-black' : 'text-red-500'}`}>
//                 {hotel.Refund_Status}
//               </p>
//               <p className="text-black mt-3 text-xl mb-2 font-extrabold">
//               ₹ {hotel.Type1_Price}
//               </p>
//              </div>
//             </div>
//             <div className="ml-[8rem] justify-end ">
              
//               <p className='text-black text-sm mb-2 '>+₹1020 taxes</p>
//               <p className='text-black text-sm mb-2 '>per night for 1 room</p>

        
//         {/* <button
//           className="text-white font-medium w-[11rem] h-10 rounded"
//           style={{ backgroundColor: "#90CCBA" }}
//           onClick={() => handleReserveRoom("Room_Type_1", hotel.Type1_Price)}
//         >
//           Reserve room
//         </button> */}
     
//        </div>
//       </div>
//      </div>
//     </div>



//         {/* Render Standard Room */}
//         <div onClick={() => handleReserveRoom("Room_Type_2", hotel.Type2_Price)}
//         className="bg-white mb-4 h-[27rem] w-[17rem] ml-[0.5rem] shadow font-poppins rounded-lg overflow-hidden flex flex-col md:flex-row">
                
//         <img
//           src={hotel.Type2_Img}
//           className="w-[15rem] h-[13rem] object-cover items-center rounded-lg m-[1rem]"
//         />
//        <div className="py-4 flex ">
//           <div className="flex items-center ">
//             <div className="ml-4 w-[280px]">
//               <h1 className="text-xl font-bold">{hotel.Room_Type_2}</h1>


//               <div className="text-sm mt-2">
//                 <ul className="list-disc pl-5">
//                 {hotel.Facilities_Type_2.split("\n").map((facility, index) => (
//                   <li key={index}>{facility}</li>
//                 ))}
//               </ul>
//             </div>

            
//             <div className="text-gray-600 font-semibold mt-3 text-emerald-400 mr-[2rem]">
//               <p className={`mt-2 ml-1 mb-2 ${hotel.Refund_Status === 'Refundable' ? 'text-black' : 'text-red-500'}`}>
//                 {hotel.Refund_Status}
//               </p>
//               <p className="text-black mt-3 text-xl mb-2 font-extrabold">
//               ₹ {hotel.Type2_Price}
//               </p>
//             </div>  
//             </div>
//             <div className="ml-[8rem] justify-end ">
//               {/* <p className="text-black mt-3 text-xl mb-2 font-extrabold">
//               ₹ {hotel.Type2_Price}
//               </p> */}
//               <p className='text-black text-sm mb-2 '>+₹1020 taxes</p>
//               <p className='text-black text-sm mb-2 '>per night for 1 room</p>

//         <button
//           className="bg-[#90CCBA] hover:bg-[#46c79f]text-white font-medium w-[11rem] h-10 rounded "          
//           onClick={() => handleReserveRoom("Room_Type_2", hotel.Type2_Price)}
//         >
//           Reserve room
//         </button>
//          </div>
//        </div>
//       </div>
//     </div>

//   </div>
   
//    </>
//   );
// }

// export default RoomCard;

















// import React from "react";

// function RoomCard({ hotel, setSelectedRoom }) {
//   const handleReserveRoom = (roomType, price) => {
//     const selectedRoomData = {
//       roomType,
//       price,
//     };
//     setSelectedRoom(selectedRoomData);
//   };

//   return (
//     <div className="p-9 ml-[5rem]">
//       {/* Render Deluxe Room */}
//       <div className="bg-white mb-4 h-[14rem] w-[95%] shadow font-poppins rounded-lg overflow-hidden flex flex-col md:flex-row">
//         {/* ... */}

//         <img
//           src={hotel.Type1_Img}
//           className="w-[30%] h-48 object-cover item-center rounded-lg m-[1rem]"
//         />
//         <div className="py-4 flex ">
//           <div className="flex items-center ">
//             <div className="ml-4 w-[280px]">
//               <h1 className="text-2xl font-bold">{hotel.Room_Type_1}</h1>


//               <div className="text-sm mt-2">
//                 <ul className="list-disc pl-5">
//                 {hotel.Facilities_Type_1.split("\n").map((facility, index) => (
//                   <li key={index}>{facility}</li>
//                 ))}
//               </ul>
//             </div>

//             <div className="text-gray-600 font-semibold mt-3 text-emerald-400 mr-[2rem]">
//               <p className={`mt-2 ml-1 mb-2 ${hotel.Refund_Status === 'Refundable' ? 'text-black' : 'text-red-500'}`}>
//                 {hotel.Refund_Status}
//               </p>
//             </div>
//             </div>
//             <div className="ml-[8rem] justify-end ">
//               <p className="text-black mt-3 text-xl mb-2 font-extrabold">
//               ₹ {hotel.Type1_Price}
//               </p>
//               <p className='text-black text-sm mb-2 '>+₹1020 taxes</p>
//               <p className='text-black text-sm mb-2 '>per night for 1 room</p>

        
//         <button
//           className="text-white font-medium w-[11rem] h-10 rounded"
//           style={{ backgroundColor: "#90CCBA" }}
//           onClick={() => handleReserveRoom("Room_Type_1", hotel.Type1_Price)}
//         >
//           Reserve room
//         </button>
//        </div>
//       </div>
//      </div>
//     </div>



//       {/* Render Standard Room */}
//       <div className="bg-white h-[14rem] w-[95%] shadow font-poppins rounded-lg overflow-hidden flex flex-col md:flex-row">
//         {/* ... */}

//         <img
//           src={hotel.Type2_Img}
//           className="w-[30%] h-48 object-cover item-center rounded-lg m-[1rem]"
//         />
//        <div className="py-4 flex ">
//           <div className="flex items-center ">
//             <div className="ml-4 w-[280px]">
//               <h1 className="text-xl font-bold">{hotel.Room_Type_2}</h1>


//               <div className="text-sm mt-2">
//                 <ul className="list-disc pl-5">
//                 {hotel.Facilities_Type_2.split("\n").map((facility, index) => (
//                   <li key={index}>{facility}</li>
//                 ))}
//               </ul>
//             </div>

            
//             <div className="text-gray-600 font-semibold mt-3 text-emerald-400 mr-[2rem]">
//               <p className={`mt-2 ml-1 mb-2 ${hotel.Refund_Status === 'Refundable' ? 'text-black' : 'text-red-500'}`}>
//                 {hotel.Refund_Status}
//               </p>
//             </div>  
//             </div>
//             <div className="ml-[8rem] justify-end ">
//               <p className="text-black mt-3 text-xl mb-2 font-extrabold">
//               ₹ {hotel.Type2_Price}
//               </p>
//               <p className='text-black text-sm mb-2 '>+₹1020 taxes</p>
//               <p className='text-black text-sm mb-2 '>per night for 1 room</p>

//         <button
//           className="text-white font-medium w-[11rem] h-10 rounded"
//           style={{ backgroundColor: "#90CCBA" }}
//           onClick={() => handleReserveRoom("Room_Type_2", hotel.Type2_Price)}
//         >
//           Reserve room
//         </button>
//       </div>
//     </div>
//     </div>
//     </div>
//   </div>
//   );
// }

// export default RoomCard;


