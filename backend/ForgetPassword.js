const express = require('express');
const app = express();
const ResetPasswordSchema = require('./Models/user.model');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const Email = process.env.EMAIL;
const Pass = process.env.PASS
const frontendurl = process.env.FRONTEND_URL;

app.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    try {
        const user = await ResetPasswordSchema.findOne({ email });

        if (!user) {
            return res.json({ message: 'user not found' });
        }

        const token = crypto.randomBytes(20).toString('hex');
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000;

        await user.save();
        
        const transporter = nodemailer.createTransport({
            // Your email service configuration
            service: 'Gmail',
            auth: {
                user: `${Email}`,
                pass: `${Pass}`
            }
        });

        const mailOptions = {
            from: `${Email}`,
            to: email,
            subject: 'Reset your password',
            text: `You are receiving this because you (or someone else) have requested to reset the password for your account.\n\n`
                + `Please click on the following link, or paste this into your browser to complete the process:\n\n`
                + `${frontendurl}/reset-password/${token}\n\n`
                + `If you did not request this, please ignore this email and your password will remain unchanged.\n`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                return res.status(500).send({ message: 'Error in sending email' });
            }
            console.log('Email sent: ' + info.response);
            res.json({ message: 'Email sent successfully' });
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

module.exports = app;