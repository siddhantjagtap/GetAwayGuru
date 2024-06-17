const express = require('express');
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');
const ResetSchema = require('./Models/user.model');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt'); // Import bcrypt library

app.use(cors());
app.use(bodyParser.json());

app.post('/reset-password/:token', async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;                      

    // Log the received token and password for debugging
    console.log('Token:', token);
    console.log('Password:', password);

    try {
        const user = await ResetSchema.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ message: 'Password reset token is invalid or has expired.' });
        }

        if (!password) {
            return res.status(400).json({ message: 'Password is required.' });
        }

        // Hash the new password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        user.password = hashedPassword; // Save hashed password
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.json({ message: 'Password has been reset successfully.' });
        } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

module.exports = app;
