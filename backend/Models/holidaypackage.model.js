const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const packagesSchema = new Schema({
    package_id: {
        type: Number,
        required: true,
        unique: true
    },
    package_name: {
        type: String,
        required: true,
        unique: true
    },
    Location:{
        type: String,
        required: true,
    },
    Price:{
        type: Number,
        required: true
    },
    card_image:{
        type: String,
        required: true
    },
    Facilities:{
        type: String,
        required: true
    },
    img_1:{
        type: String,
        required: true
    },
    img_2:{
        type: String,
        required: true
    },
    img_3:{
        type: String,
        required: true
    },
    img_4:{
        type: String,
        required: true
    },
    img_5:{
        type: String,
        required: true
    },
    overview:{
        type: String,
        required: true
    },
    day_1:{
        type: String,
        required: true
    },
    day_2:{
        type: String,
        required: true
    },
    day_3:{
        type: String,
        required: true
    },
    day_4:{
        type: String,
        required: true
    },
    day_5:{
        type: String,
        required: true
    },
    day_6:{
        type: String,
        required: true
    },
    day_7:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Holidaypackagedb', packagesSchema);