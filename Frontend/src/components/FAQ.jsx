import React, { useState } from 'react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "Q. How to book a hotel online with GetAwayGuru?",
      answer: "A. Booking a hotel online is easy through GetAwayGuru. All you need to do first is to download our app on your Android or iOS device or simply use your computer. On the app, tap on the Hotels section on the top left corner and enter the details of the city, the area or the hotel. Fill out the check-in and check-out dates, along with the other details and tap Search. Use the Sort & Filter options so that you can book one as per your convenience. You can also choose hotels according to user reviews and ratings. The same follows on our site."
    },
    {
      question: "Q. How to find the cheapest hotel deals in any city?",
      answer: "A. GetAwayGuru, being the best hotel-booking site in the country, offers several discounts on budget hotels as well. If you are looking for the cheapest hotels with amazing deals on the app, you can tap on Sort & Filter option and drag down the Price option from Rs.0 to Rs.500 or from Rs.0 to Rs.1000. Choose from the various amenities you would need during your stay including access to Wi-Fi, room service and in-house restaurants. The list will first show you the cheapest one on top."
    },
    {
      question: "Q. How to find the best hotels near me?",
      answer: "A. If you are travelling to a city for the first time and are looking for hotels in the best areas, it is easy to find them on our website and our app. Let’s say, you are going to Goa and planning to book one near the most happening beaches. Once you have hit the Search option, you will find a list of all the hotels in North Goa near the famed beach areas including Baga and Calangute. You can even find out which of the areas are ideal for couples and families. Similarly, if you are looking for booking hotels in Mumbai, you can either book ones that are near the city’s major business districts, tourist areas and transportation hubs."
    },
    {
      question: "Q. Where can I find current deals and offers of GetAwayGuru?",
      answer: "A. GetAwayGuru offers plenty of deals and offers on luxury and budget hotels in India in all the cities, on a daily basis. However, these are available for a limited time and they are subject to change the next day. You can look for these deals while you are about to book the hotel after narrowing down your choices. On the app, you can check a property that has ‘MMT Exclusive Deal’ button below its discounted rate. By tapping on it, you would know how many offers are available."
    },
    {
      question: "Q. How to sign up for an account on GetAwayGuru?" ,
      answer: "A. Signing up for an account on GetAwayGuru is quick and easy. Download our app from the App Store or Google Play, or visit our website. On the home screen, tap on the 'Sign Up' button. Fill in your details including name, email, and password, and then click 'Create Account'. You will receive a confirmation email to verify your account. Follow the link in the email, and you’re all set!"
    },
    
    {
      question: "Q. How to manage my bookings on GetAwayGuru?" ,
      answer: "A. Managing your bookings on GetAwayGuru is straightforward. Open the app or website and log into your account. Navigate to the 'My Bookings' section from the menu. Here, you can view, modify, or cancel your bookings. You can also see the details of your past and upcoming stays."
    },
    {
      question: "Q. Can I book hotels internationally through GetAwayGuru?" ,
      answer: "A. Yes, GetAwayGuru allows you to book hotels internationally. Open the app or visit the website and enter your desired international city in the search bar. Fill in the check-in and check-out dates, and other preferences, then tap 'Search'. You can filter the results to find the best deals and suitable accommodations abroad."
    },
    {
      question: "Q. How do I use a promo code on GetAwayGuru?" ,
      answer: "A. To use a promo code on GetAwayGuru, start by selecting your hotel and filling in the necessary booking details. When you reach the payment page, you will see an option to enter a promo code. Type in your promo code and click 'Apply'. The discount will be reflected in the total amount before you proceed with the payment."
    },
    {
      question: "Q. How to book a hotel with specific amenities on GetAwayGuru?" ,
      answer: "A. Booking a hotel with specific amenities on GetAwayGuru is easy. After entering your destination and dates, tap 'Search'. Once the results are displayed, use the 'Sort & Filter' options to select the amenities you require such as free Wi-Fi, swimming pool, spa, or gym. The filtered results will show hotels that match your preferences."
    },
    {
      question: "Q. How to book a last-minute hotel on GetAwayGuru?" ,
      answer: "A. To book a last-minute hotel on GetAwayGuru, open the app or website and enter your current location or desired destination. Set the check-in date to today or tomorrow, and tap 'Search'. Use the 'Sort & Filter' options to find hotels available for last-minute booking, ensuring you get the best deal and immediate confirmation."
    },
    {
      question: "Q. Can I book multiple rooms at once on GetAwayGuru?" ,
      answer: "A. Yes, you can book multiple rooms at once on GetAwayGuru. When entering your booking details, specify the number of rooms and the number of guests per room. The search results will show options available for your group size. Select the desired hotel and proceed with booking multiple rooms in one transaction."
    },
  ];

  return (
    <div className="container mx-auto px-4 mt-4 md:w-full w-[25rem] ">
      <h1 className="text-xl font-bold mb-2 mt-8">FAQ</h1>
      <div className="space-y-8 ">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white pl-4 pr-4 pb-2  pt-2 rounded-lg">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleAnswer(index)}
            >
              <h1 className="text-lg font-semibold">{faq.question}</h1>
              <span>{openIndex === index ? '-' : '+'}</span>
            </div>
            {openIndex === index && (
              <p className="text-sm leading-relaxed mt-4 flex flex-wrap">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
      <div className="mt-8">
        <hr className="border-gray-300" />
      </div>
    </div>
  );
};

export default FAQ;








// import React from 'react';

// const FAQ = () => {
//   return (
//     <div className="container mx-auto px-4 mt-4">
//      <h1 className="text-xl font-bold mb-2 mt-8">FAQ</h1>

//       <div className="flex flex-wrap -mx-4">
//         <div className="w-full md:w-1/2 mb-8 md:mb-0 px-4">
//           <div className="bg-white p-4 rounded-lg ">
//             <h1 className="text-lg font-semibold mb-4">Q. How to book a hotel online with GetAwayGuru?</h1>
//             <p className="text-sm leading-relaxed mb-4">A. Booking a hotel online is easy through GetAwayGuru. All you need to do first is to download our app on your Android or iOS device or simply use your computer. On the app, tap on the Hotels section on the top left corner and enter the details of the city, the area or the hotel. Fill out the check-in and check-out dates, along with the other details and tap Search. Use the Sort & Filter options so that you can book one as per your convenience. You can also choose hotels according to user reviews and ratings. The same follows on our site.</p>
//           </div>
//         </div>
//         <div className="w-full md:w-1/2 px-4">
//           <div className="bg-white p-4 rounded-lg ">
//             <h1 className="text-lg font-semibold mb-4">Q. How to find the cheapest hotel deals in any city?</h1>
//             <p className="text-sm leading-relaxed mb-4">A. GetAwayGuru, being the best hotel-booking site in the country, offers several discounts on budget hotels as well. If you are looking for the cheapest hotels with amazing deals on the app, you can tap on Sort & Filter option and drag down the Price option from Rs.0 to Rs.500 or from Rs.0 to Rs.1000. Choose from the various amenities you would need during your stay including access to Wi-Fi, room service and in-house restaurants. The list will first show you the cheapest one on top.</p>
//           </div>
//         </div>

//         {/* Horizontal line */}
//         <div className=" ml-4 w-[76rem] ">
//           <hr className="border-gray-300 my-8" />
//         </div>

//         {/* 2nd row */}
//         <div className="w-full md:w-1/2 mb-8 md:mb-0 mt-2 px-4">
//           <div className="bg-white p-4 mt-[-1rem] mb-2 ">
//             <h1 className="text-lg font-semibold mb-4">Q. How to find the best hotels near me?</h1>
//             <p className="text-sm leading-relaxed mb-4">A. If you are travelling to a city for the first time and are looking for hotels in the best areas, it is easy to find them on our website and our app. Let’s say, you are going to Goa and planning to book one near the most happening beaches. Once you have hit the Search option, you will find a list of all the hotels in North Goa near the famed beach areas including Baga and Calangute. You can even find out which of the areas are ideal for couples and families. Similarly, if you are looking for booking hotels in Mumbai, you can either book ones that are near the city’s major business districts, tourist areas and transportation hubs.</p>
//           </div>
//         </div>
//         <div className="w-full md:w-1/2 px-4 mt-[-0.3rem]">
//           <div className="bg-white p-4 ">
//             <h1 className="text-lg font-semibold mb-4">Q. Where can I find current deals and offers of GetAwayGuru?</h1>
//             <p className="text-sm leading-relaxed mb-4">A. GetAwayGuru offers plenty of deals and offers on luxury and budget hotels in India in all the cities, on a daily basis. However, these are available for a limited time and they are subject to change the next day. You can look for these deals while you are about to book the hotel after narrowing down your choices. On the app, you can check a property that has ‘MMT Exclusive Deal’ button below its discounted rate. By tapping on it, you would know how many offers are available.</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FAQ;