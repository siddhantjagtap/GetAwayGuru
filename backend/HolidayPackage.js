const express = require('express');
const cors = require('cors');
const HolidayPackage = require('./Models/holidaypackage.model'); // Your model file

const app = express();
app.use(cors()); // Enable CORS

app.get('/holidaypackages/location/:Location', async (req, res) => {
  const { Location } = req.params;
  try {
    const locationTitleCase = Location.charAt(0).toUpperCase() + Location.slice(1).toLowerCase();
    const packages = await HolidayPackage.find({ Location: { $regex: new RegExp('^' + locationTitleCase, 'i') } });

    if (!packages || packages.length === 0) {
      return res.status(404).json({ message: 'No packages found for the specified location' });
    }
    res.status(200).json(packages);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching packages');
  }
});

app.get('/holidaypackages/:Package_Name', async (req, res) => {
  const { Package_Name } = req.params;
  // Convert hyphens back to spaces
  const decodedPackageName = decodeURIComponent(Package_Name).replace(/-/g, ' ')
  try {
    const package = await HolidayPackage.findOne({ Package_Name: decodedPackageName });
    if (!package) {
      return res.status(404).json({ message: 'package not found' });
    }
    res.status(200).json(package);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = app;
