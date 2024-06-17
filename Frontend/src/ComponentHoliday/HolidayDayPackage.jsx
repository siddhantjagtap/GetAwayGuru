import React from 'react';

function HolidayDayPackage({ singlePackage }) {
  // Convert the package object into an array of days
  const days = Object.keys(singlePackage)
    .filter(key => key.startsWith('Day_'))
    .map(dayKey => {
      const dayNumber = dayKey.split('_')[1]; // Get the day number
      return {
        dayNumber,
        description: singlePackage[dayKey],
        image: singlePackage[`Day${dayNumber}_img`]
      };
    });

  return (
    <>
      <div className="container mx-auto mt-8 px-4">
        {days.map(({ dayNumber, description, image }) => (
          <div key={dayNumber} className="transform transition-transform duration-300 hover:scale-105 font-poppins md:ml-[5rem] md:w-[69rem] border rounded-2xl border-gray-300 mb-8 p-4 shadow-lg">
            <h2 className="font-bold text-xl mb-4">Day {dayNumber}</h2>
            <div className="flex flex-col lg:flex-row">
              <p className="flex-1 mb-4 lg:mb-0 lg:mr-4">{description}</p>
              <img
                src={image}
                className="w-full lg:w-80 h-56 rounded-xl object-cover transform transition-transform duration-300 hover:scale-105"
                alt={`Image for Day ${dayNumber}`}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default HolidayDayPackage;







// import React from 'react';

// function HolidayDayPackage({ singlePackage }) {
//   return (
//     <>
//       <div className="container mx-auto mt-8 px-4">
//         {/* Day 1 */}
//         <div className=" transform transition-transform duration-300 hover:scale-105 font-poppins md:ml-[5rem] md:w-[69rem] border rounded-2xl border-gray-300 mb-8 p-4 shadow-lg">
//           <h2 className="font-bold text-xl mb-4">Day 1</h2>
//           <div className="flex flex-col lg:flex-row">
//             <p className="flex-1 mb-4 lg:mb-0 lg:mr-4">
//               {singlePackage.Day_1}
//             </p>
//             <img
//               src={singlePackage.Day1_img}
//               className="w-full lg:w-80 h-56 rounded-xl object-cover transform transition-transform duration-300 hover:scale-105"
//               alt="Coastal town in Greece"
//             />
//           </div>
//         </div>

//         {/* Day 2 */}
//         <div className=" transform transition-transform duration-300 hover:scale-105 font-poppins md:ml-[5rem] md:w-[69rem] border rounded-2xl border-gray-300 mb-8 p-4 shadow-lg">
//           <h2 className="font-bold text-xl mb-4">Day 2</h2>
//           <div className="flex flex-col lg:flex-row">
//             <p className="flex-1 mb-4 lg:mb-0 lg:mr-4">
//               {singlePackage.Day_2}
//             </p>
//             <img
//               src={singlePackage.Day2_img}
//               className="w-full lg:w-80 h-56 rounded-xl object-cover transform transition-transform duration-300 hover:scale-105"
//               alt="Coastal town in Greece"
//             />
//           </div>
//         </div>

//         {/* Day 3 */}
//         <div className=" transform transition-transform duration-300 hover:scale-105 font-poppins md:ml-[5rem] md:w-[69rem] border rounded-2xl border-gray-300 mb-8 p-4 shadow-lg">
//           <h2 className="font-bold text-xl mb-4">Day 3</h2>
//           <div className="flex flex-col lg:flex-row">
//             <p className="flex-1 mb-4 lg:mb-0 lg:mr-4">
//               {singlePackage.Day_3}
//             </p>
//             <img
//               src={singlePackage.Day3_img}
//               className="w-full lg:w-80 h-56 rounded-xl object-cover transform transition-transform duration-300 hover:scale-105"
//               alt="Coastal town in Greece"
//             />
//           </div>
//         </div>

//         {/* Day 4 */}
//         <div className=" transform transition-transform duration-300 hover:scale-105 font-poppins md:ml-[5rem] md:w-[69rem] border rounded-2xl border-gray-300 mb-8 p-4 shadow-lg">
//           <h2 className="font-bold text-xl mb-4">Day 4</h2>
//           <div className="flex flex-col lg:flex-row">
//             <p className="flex-1 mb-4 lg:mb-0 lg:mr-4">
//               {singlePackage.Day_4}
//             </p>
//             <img
//               src={singlePackage.Day4_img}
//               className="w-full lg:w-80 h-56 rounded-xl object-cover transform transition-transform duration-300 hover:scale-105"
//               alt="Coastal town in Greece"
//             />
//           </div>
//         </div>

//         {/* Day 5 */}
//         <div className=" transform transition-transform duration-300 hover:scale-105 font-poppins md:ml-[5rem] md:w-[69rem] border rounded-2xl border-gray-300 mb-8 p-4 shadow-lg">
//           <h2 className="font-bold text-xl mb-4">Day 5</h2>
//           <div className="flex flex-col lg:flex-row">
//             <p className="flex-1 mb-4 lg:mb-0 lg:mr-4">
//               {singlePackage.Day_5}
//             </p>
//             <img
//               src={singlePackage.Day5_img}
//               className="w-full lg:w-80 h-56 rounded-xl object-cover transform transition-transform duration-300 hover:scale-105"
//               alt="Coastal town in Greece"
//             />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default HolidayDayPackage;
