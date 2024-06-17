const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventsSchema = new Schema({
  event_category: {
    type: String,
    required: true,
  },
  event_id: {
    type: Number,
    required: true,
  },
  Location: {
    type: String,
    required: true,
  },
  Venue_addr: {
    type: String,
    required: true,
  },
  event_name: {
    type: String,
    required: true,
  },
  Date: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  artist_name: {
    type: String,
    required: true,
  },
  artist_img: {
    type: String,
    required: true,
  },
  show_venue: {
    type: String,
    required: true,
  },
  card_img: {
    type: String,
    required: true,
  },
  main_img: {
    type: String,
    required: true,
  },
  show_info: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
  venue_layout: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Eventsdb", eventsSchema);
