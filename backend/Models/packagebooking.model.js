const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const packagesbookingSchema = new Schema({
  orderDate: { 
    type: String, 
    required: true 
  },
  username: {
    type: String,
    required: true,
  },
  guestName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  contact_number: {
    type: Number,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  Packages_Name: {
    type: String,
    required: true,
  },
  Departure_Date: {
    type: String,
    required: true,
  },
  numberOfGuests: {
    type: Number,
    required: true,
  },
  numberOfRooms: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true
  },
  razorpay_order_id: {   // Add this field
    type: String, 
    required: true 
  }, 
  razorpay_payment_id: { 
    type: String 
  },
  paymentStatus: {
    type: String
  } 
 });
  
module.exports = mongoose.model('Packages_Booking', packagesbookingSchema);