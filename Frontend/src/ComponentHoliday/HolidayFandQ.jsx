import React, { useState } from 'react';

const HolidayFandQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "Q. How to book a holiday package on GetAwayGuru?",
      answer: "A. Booking a holiday package on GetAwayGuru is easy. Simply go to the 'Holiday Packages' section on our app or website, and enter your desired destination or location. Select your travel dates, the number of travelers, and any other preferences you may have. Browse through the available packages, read the descriptions and inclusions, and select the one that best suits your needs. Proceed to the checkout process, provide your details, and complete the payment."
    },
    {
      question: "Q. What types of holiday packages are available on GetAwayGuru?",
      answer: "A. GetAwayGuru offers a wide range of holiday packages to cater to different travel needs. We have packages for domestic and international destinations, ranging from beach vacations, hill station getaways, adventure trips, cultural tours, and more. You can find packages that include flights, accommodations, sightseeing tours, activities, and other inclusions."
    },
    {
      question: "Q. Can I customize a holiday package on GetAwayGuru?",
      answer: "A. Yes, you can customize holiday packages on GetAwayGuru to suit your preferences. After selecting a package, you will have the option to modify certain components, such as the number of nights, room type, or add-on activities. Our team can also work with you to create a fully customized package tailored to your specific needs."
    },
    {
      question: "Q. How far in advance should I book a holiday package?",
      answer: "A. It's recommended to book your holiday package well in advance, especially during peak travel seasons or for popular destinations. Early booking can help you secure better rates and availability. However, we also offer last-minute deals and discounts for those looking to plan their holidays at the last moment."
    },
    {
      question: "Q. Can I make changes or cancellations to holiday package booking?",
      answer: "A. Yes, you can make changes or cancellations to your holiday package booking, subject to the terms and conditions of the package. Some packages may allow free cancellations or changes up to a certain date, while others may have a fee or penalty. Please refer to the specific package details or contact our customer support team for assistance."
    },
    // Add more questions and answers related to holiday packages here
  ];

  return (
    <div className="container mx-auto px-4 mt-4 md:w-full w-[25rem]">
      <h1 className="text-xl font-bold mb-2 mt-8">FAQ</h1>
      <div className="space-y-8">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white pl-4 pr-4 pb-2 pt-2 rounded-lg">
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

export default HolidayFandQ;