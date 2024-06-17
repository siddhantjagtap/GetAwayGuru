import React, { useState } from "react";
import Navbar from "../components/Navbar";

function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [contactInfo, setContactInfo] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    setContactInfo({ name, email, message });
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center h-full">
       
        <div className="w-[35rem] h-full    p-8">
          <h1 className="font-bold mb-5 text-[30px]">contact us</h1>
          <p className="text-[16px] ">Feel free to contact us any time. We will get back to you as soon as we can!</p>
          <form onSubmit={handleSubmit}>
            <div className="flex mt-3 mb-2">
              <label className="block font-bold w-1/2 mr-2">
                Name:
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full  rounded border p-2 pl-10 text-sm text-gray-700"
                />
              </label>
              <label className="block font-bold  w-1/2">
                Email:
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded border p-2 pl-10 text-sm text-gray-700"
                />
              </label>
            </div>
            <label className="block font-bold  mb-2">
              Message:
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full rounded border h-[10rem] p-2 pl-10 text-sm text-gray-700"
              />
            </label>
            <button
              type="submit"
              className=" bg-teal-200 hover:bg-orange-70 text-white w-full font-bold py-2 px-4 rounded"
            >
              Send
            </button>
          </form>
        </div>
        <div className="w-[20rem] ml-6 p-5 bg-teal-100 h-[25rem]">
          <h2 className="text-[20px] font-bold mb-2">Contact Information</h2>
          
          <ul>
            {contactInfo.name && (
              <li>
                <strong>Name:</strong> {contactInfo.name}
              </li>
            )}
            {contactInfo.email && (
              <li>
                <strong>Email:</strong> {contactInfo.email}
              </li>
            )}
            {contactInfo.message && (
              <li>
                <strong>Message:</strong> {contactInfo.message}
              </li>
            )}
          </ul>
       <div/>
        </div>
      </div>
    </>
  );
}

export default ContactPage;