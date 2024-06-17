const express = require('express')
const app = express()
const schema = require('./Models/hotel.model')


// GET request to fetch all hotels
app.get('/hotels', async (req, res) => {
    try {
        const hotels = await schema.find();

        if (!hotels || hotels.length === 0) {
            return res.status(404).json({ message: 'No hotels found' });
        }
        res.status(200).json(hotels); // Send successful response with hotels data
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// GET request to fetch hotels by name
app.get('/hotels/:Hotel_Name', async (req, res) => {
    const { Hotel_Name } = req.params;
    // Convert hyphens back to spaces
    const decodedHotelName = decodeURIComponent(Hotel_Name).replace(/-/g, ' ');

    try {
        const hotel = await schema.findOne({ Hotel_Name: decodedHotelName });

        if (!hotel) {
            return res.status(404).json({ message: 'Hotel not found' });
        }

        res.status(200).json(hotel); // Send successful response with hotel data
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
});


app.get('/hotels/location/:Location', async (req, res) => {
    const { Location } = req.params;

    try {
        // Convert the input location to title case for case-insensitive search
        const locationTitleCase = Location.charAt(0).toUpperCase() + Location.slice(1).toLowerCase();
        // Use a case-insensitive regular expression for matching
        const hotels = await schema.find({ Location: { $regex: new RegExp('^' + locationTitleCase, 'i') } });

        if (!hotels || hotels.length === 0) {
            return res.status(404).json({ message: 'No hotels found for the specified location' });
        }
        res.status(200).json(hotels); // Send successful response with hotels data
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

    
module.exports = app;    