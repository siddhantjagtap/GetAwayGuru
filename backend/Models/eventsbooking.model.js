const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventsbookingSchema = new Schema({
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
  Event_Name: {
    type: String,
    required: true,
  },
  Event_Date: {
    type: String,
    required: true,
  },
  numberOfGuests: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true
  },
  venue_addr: {
    type: String,
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
  
module.exports = mongoose.model('Events_Booking', eventsbookingSchema);