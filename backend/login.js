const express = require('express');
const app = express()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const schema = require('./Models/user.model');

// Define route
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await schema.findOne({ email });

        if (!user) { // If email not found
            return res.status(401).json({ msg: 'Invalid email or password' });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regular expression for valid email format
        if (!emailRegex.test(email)) {
            return res.status(400).send({ msg: 'Invalid email format' });
        }

        // Compare passwords
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ msg: 'Invalid email or password' });
        }

        // Generate token with user details
        const token = jwt.sign(
            {
                userId: user._id,
                username: user.username,
                email: user.email
            },
            'your-secret-key',
            { expiresIn: '1h' }
        );

        // Send token and user details in the response
        res.json({
            token,
            user: {
                _id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({ msg: 'Server Error' }); // Handle server errors
    }
});
module.exports = app;