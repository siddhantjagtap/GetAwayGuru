const express = require("express");
const app = express();
const cors = require("cors")
const Booking = require("./Models/booking.model");
const PackageBooking = require("./Models/packagebooking.model");
const EventBooking = require("./Models/eventsbooking.model");
const { v4: uuidv4 } = require('uuid'); // Import uuid to generate unique IDs
const Razorpay = require('razorpay'); // Import Razorpay
app.use(express.json());
app.use(cors())

//hotel booking
app.post("/hotels/booking", async (req, res) => {
  const {
    Hotel_Name,
    checkInDate,
    checkOutDate,
    numberOfGuests,
    numberOfRooms,
    contact_number,
    state,
    room_Type,
    amount,
    guestName,
    breakfast,
    username,
    email
  } = req.body;

  // Validate the request body
  if (
    !Hotel_Name ||
    !checkInDate ||
    !checkOutDate ||
    !numberOfGuests ||
    !numberOfRooms ||
    !contact_number ||
    !state ||
    !room_Type ||
    !guestName ||
    !amount ||
    breakfast === undefined
  ) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Function to format the date to dd-mm-yyyy using toLocaleDateString
  const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString('en-GB'); // 'en-GB' locale formats the date as dd/mm/yyyy
  };

  // Format the dates
  const formattedCheckInDate = formatDate(checkInDate);
  const formattedCheckOutDate = formatDate(checkOutDate);

  try {
    // Initialize Razorpay instance
    console.log("Initializing Razorpay with Key ID:", process.env.RAZORPAY_KEY_ID);
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    // Create Razorpay order options
    const receiptId = `rcpt_${uuidv4().substring(0, 8)}`;
    const options = {
      amount: amount * 100, // amount in smallest currency unit (e.g., paise for INR)
      currency: "INR",
      receipt: receiptId,
      payment_capture: 1, // auto capture
    };

    // Create Razorpay order
    const razorpayOrder = await razorpay.orders.create(options);

    if (!razorpayOrder) {
      console.error("Error creating Razorpay order");
      return res.status(500).send("Error creating Razorpay order");
    }

    const orderDate = new Date().toLocaleDateString('en-GB');
    const newBooking = new Booking({
      orderDate,
      username,
      email,
      contact_number,
      state,
      room_Type,
      Hotel_Name,
      checkInDate: formattedCheckInDate,
      checkOutDate: formattedCheckOutDate,
      numberOfGuests,
      numberOfRooms,
      amount,
      breakfast,
      guestName,
      paymentStatus: 'not completed',
      razorpay_order_id: razorpayOrder.id, // Save Razorpay order ID
    });

    const savedBooking = await newBooking.save();

    // Return the saved booking object and Razorpay order details as a response
    res.status(201).json({
      message: "Booking created successfully",
      hotelBookingDetails: {
        bookingId: savedBooking._id,
        razorpayOrderId: razorpayOrder.id,
        amount: razorpayOrder.amount,
        email,
        username,
        orderDate,
        Hotel_Name,
        checkInDate: formattedCheckInDate,
        checkOutDate: formattedCheckOutDate,
        numberOfGuests,
        numberOfRooms,
        contact_number,
        state,
        guestName,
        room_Type,
        breakfast
      }
    });
  } catch (error) {
    console.error("Error saving booking:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});




// API to get booking history by email of hotel
app.get('/hotelbooking/history/:email', async (req, res) => {
  const email = req.params.email;

  try {
    const bookings = await Booking.find({ email });

    if (bookings.length === 0) {
      return res.status(404).json({ error: 'No bookings found for the provided email' });
    }

    res.status(200).json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});


// API to get booking history by email of holiday
app.get('/packagebooking/history/:email', async (req, res) => {
  const email = req.params.email;

  try {
    const bookings = await PackageBooking.find({ email });

    if (bookings.length === 0) {
      return res.status(404).json({ error: 'No bookings found for the provided email' });
    }

    res.status(200).json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});


// API to get booking history by email of events
app.get('/events/history/:email', async (req, res) => {
  const email = req.params.email;

  try {
    const eventsbookings = await EventBooking.find({ email });

    if (eventsbookings.length === 0) {
      return res.status(404).json({ error: 'No bookings found for the provided email' });
    }

    res.status(200).json(eventsbookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});


// holiday packages booking(checkout page)
app.post("/holidaypackages/booking", async (req, res) => {
  const {
    Packages_Name,
    Departure_Date,
    numberOfGuests,
    numberOfRooms,
    contact_number,
    state,
    amount,
    guestName,
    username,
    email,
  } = req.body;

  // Validate the request body
  if (
    !Packages_Name ||
    !Departure_Date ||
    !numberOfGuests ||
    !numberOfRooms ||
    !contact_number ||
    !state ||
    !amount ||
    !username ||
    !guestName ||
    !email
  ) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Function to format the date to dd-mm-yyyy using toLocaleDateString
  const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString('en-GB'); // 'en-GB' locale formats the date as dd/mm/yyyy
  };

  // Format the dates
  const formattedDeparture_Date = formatDate(Departure_Date);

  try {
    // Initialize Razorpay instance
    console.log("Initializing Razorpay with Key ID:", process.env.RAZORPAY_KEY_ID);
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    // Create Razorpay order options
    const receiptId = `rcpt_${uuidv4().substring(0, 8)}`;
    const options = {
      amount: amount * 100, // amount in smallest currency unit (e.g., paise for INR)
      currency: "INR",
      receipt: receiptId,
      payment_capture: 1, // auto capture
    };

    // Create Razorpay order
    const razorpayOrder = await razorpay.orders.create(options);

    if (!razorpayOrder) {
      console.error("Error creating Razorpay order");
      return res.status(500).send("Error creating Razorpay order");
    }

    const orderDate = new Date().toLocaleDateString('en-GB');
    const newBooking = new PackageBooking({
      orderDate,
      username,
      email,
      contact_number,
      state,
      Packages_Name,
      Departure_Date: formattedDeparture_Date,
      numberOfGuests,
      numberOfRooms,
      guestName,
      amount,
      paymentStatus: 'not completed',
      razorpay_order_id: razorpayOrder.id, // Save Razorpay order ID
    });

    const savedBooking = await newBooking.save();

    // Return the saved booking object and Razorpay order details as a response
    res.status(201).json({
      message: "Booking created successfully",
      packageBookingDetails: {
        bookingId: savedBooking._id,
        razorpayOrderId: razorpayOrder.id,
        amount: razorpayOrder.amount,
        email,
        username,
        orderDate,
        Packages_Name,
        Departure_Date: formattedDeparture_Date,
        numberOfGuests,
        numberOfRooms,
        guestName,
        contact_number,
        state,
      },
    });
  } catch (error) {
    console.error("Error saving booking:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});


//Events booking
app.post("/events/booking", async (req, res) => {
  const {
    Event_Name,
    Event_Date,
    venue_addr,
    numberOfGuests,
    contact_number,
    state,
    amount,
    username,
    email,
  } = req.body;

  // Validate the request body
  if (
    !Event_Name ||
    !Event_Date ||
    !venue_addr ||
    !numberOfGuests ||
    !contact_number ||
    !state ||
    !amount ||
    !username ||
    !email
  ) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Function to format the date to dd-mm-yyyy using toLocaleDateString
  const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString('en-GB'); // 'en-GB' locale formats the date as dd/mm/yyyy
  };

  // Format the dates
  const formattedEvent_Date = formatDate(Event_Date);

  try {
    // Initialize Razorpay instance
    console.log("Initializing Razorpay with Key ID:", process.env.RAZORPAY_KEY_ID);
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    // Create Razorpay order options
    const receiptId = `rcpt_${uuidv4().substring(0, 8)}`;
    const options = {
      amount: amount * 100, // amount in smallest currency unit (e.g., paise for INR)
      currency: "INR",
      receipt: receiptId,
      payment_capture: 1, // auto capture
    };

    // Create Razorpay order
    const razorpayOrder = await razorpay.orders.create(options);

    if (!razorpayOrder) {
      console.error("Error creating Razorpay order");
      return res.status(500).send("Error creating Razorpay order");
    }

    const orderDate = new Date().toLocaleDateString('en-GB');
    const newBooking = new EventBooking({
      orderDate,
      username,
      email,
      contact_number,
      state,
      Event_Name,
      Event_Date: formattedEvent_Date,
      venue_addr,
      numberOfGuests,
      amount,
      paymentStatus: 'not completed',
      razorpay_order_id: razorpayOrder.id, // Save Razorpay order ID
    });

    const savedBooking = await newBooking.save();

    // Return the saved booking object and Razorpay order details as a response
    res.status(201).json({
      message: "Booking created successfully",
      eventsBookingDetails: {
        bookingId: savedBooking._id,
        razorpayOrderId: razorpayOrder.id,
        amount: razorpayOrder.amount,
        email,
        username,
        orderDate,
        Event_Name,
        Event_Date: formattedEvent_Date,
        venue_addr,
        numberOfGuests,
        contact_number,
        state,
      },
    });
  } catch (error) {
    console.error("Error saving booking:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports=app;