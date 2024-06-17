import img1 from "../assets/img/deal.jpg"
import img2 from "../assets/img/24Hr.jpg"
import img3 from "../assets/img/LargeSelection.jpg"
import img4 from "../assets/img/PayAtHotel.jpg"


function Speciality() {
  return (
    <>
      <div className="container mx-auto md:px-4 py-8 sm:mt-[10rem] md:mt-0 mt-[10rem] ">
        <h1 className="md:text-xl text-2xl font-bold md:mb-4 md:mt-1 md:ml-0 ml-[1rem] md:mb-4 mb-[2rem]">
          Why book hotels with GetawayGuru
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:w-[77rem] w-[20.5rem] md:ml-0 ml-[1.5rem]">
          {/* <div className="flex justify-center items-center ml-[3.8rem] mr-[4rem] mt-4 mb-[2rem]"> */}
          <img
            src={img1}
            alt="Image 1"
            className="rounded-xl object-cover transition duration-300 transform md:hover:scale-110 "
          />
          <img
            src={img2}
            alt="Image 1"
            className="rounded-xl object-cover transition duration-300 transform md:hover:scale-110"
          />
          <img
            src={img3}
            alt="Image 1"
            className="rounded-xl object-cover transition duration-300 transform md:hover:scale-110"
          />
          <img
            src={img4}
            alt="Image 1"
            className="rounded-xl object-cover transition duration-300 transform md:hover:scale-110"
          />
        </div>
      </div>
    </>
  );
}

export default Speciality;
