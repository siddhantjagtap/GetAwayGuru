import { IoLogoFacebook } from "react-icons/io5";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";

function Footer() {
  return (

    // Desktop View
    <footer className="bg-gray-800 text-white flex justify-between items-center md:p-4 md:w-full w-[23.8rem]">
      <div className="hidden md:flex items-center">
        <p className="mr-24 pl-[12rem]">
          © 2024 Unipolar Technology Ltd. India. All brands are trademarks of their respective owners.
        </p>
        <div className="flex space-x-4">
          <IoLogoFacebook className="text-2xl" />
          <FaSquareXTwitter className="text-2xl" />
          <FaInstagram className="text-2xl" />
        </div>
      </div>



      {/*  Mobile View */}

      <div className="md:hidden flex flex-col items-center py-8"> {/* Increased padding for mobile view */}
        <p className="mb-4 text-center">
          © 2024 Unipolar Technology Ltd. India. All brands are trademarks of their respective owners.
        </p>
        <div className="flex space-x-4">
          <IoLogoFacebook className="text-2xl" />
          <FaSquareXTwitter className="text-2xl" />
          <FaInstagram className="text-2xl" />
        </div>
      </div>
    </footer>
  );
}

export default Footer;












// Working
// import { IoLogoFacebook } from "react-icons/io5";
// import { FaSquareXTwitter } from "react-icons/fa6";
// import { FaInstagram } from "react-icons/fa";

// function Footer() {
//   return (
//     <footer className="bg-gray-800 text-white p-4 flex justify-center items-center">
//       <p className="mr-[24rem]">© 2024 Unipolar Technology Ltd.India. All brands are trademarks of their respective owners.</p>
//       <div className="ml-[4rem] mt-4 mb-2 flex space-x-4">
//       <IoLogoFacebook />
//       <FaSquareXTwitter />
//       <FaInstagram />
//       </div>
//     </footer>
//   );
// }

// export default Footer;



// old 
// function Footer(){
//   return (
//     <div className="bg-emerald-500 ">
//         <h1 className=" text-white justify-center ml-64">© 2024 Unipolar Technology Ltd.India. All brands are trademarks of their respective owners.</h1>
//     </div>
//   )
// }

// export default Footer

