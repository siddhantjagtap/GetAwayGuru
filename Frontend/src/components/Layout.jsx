import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Filter */}
      <div className="bg-white sticky top-0 z-10 border-b border-gray-200">
        {children[0]}
      </div>

      {/* Main content area */}
      <div className="flex-1 p-4">
        {/* HotelList */}
        {children[1]}
      </div>
    </div>
  );
};

export default Layout;


// import React from 'react';

// const Layout = ({ children }) => {
//   return (
//     <div className="flex flex-col md:flex-row bg-gray-100 sticky">
//       {/* Filter */}
//       <div className="md:w-1/4 md:p-4">
//         {children[0]}
//       </div>

//       {/* Main content area */}
//       <div className="flex-1 p-4 md:ml-2">
//         {/* HotelList */}
//         {children[1]}
//       </div>
//     </div>
//   );
// };

// export default Layout;