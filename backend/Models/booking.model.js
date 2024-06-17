const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  orderDate: { 
    type: String, 
    required: true 
  },
  username: {
    type: String,
    required: true,
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
  room_Type: {
    type: String,
    required: true
  },
  Hotel_Name: {
    type: String,
    required: true,
  },
  checkInDate: {
    type: String,
    required: true,
  },
  checkOutDate: {
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
  breakfast: {
    type: Boolean,
    required: true
  },
  guestName: {
    type: String,
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
  
module.exports = mongoose.model('Hotel_Booking', bookingSchema);