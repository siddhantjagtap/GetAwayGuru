const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hotelSchema = new Schema({
  Hotel_id: {
    type: String,
    required: true,
    unique: true
  },
  Name: {
    type: String,
    required: true
  },
  Location: {
    type: String,
    required: true
  },
  StarRating: {
    type: Number,
    min: 1,
    max: 5
  },
  Amenities: {
    type: [String]
  },
  Price: {
    type: String,
    required: true
  },
  Image: {
    type: String
  }
});

module.exports = mongoose.model('HotelDB', hotelSchema);
