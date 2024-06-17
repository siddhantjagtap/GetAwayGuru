const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const nodemailer = require('nodemailer');
const schema = require('./Models/user.model');

const app = express();

app.use(express.json());

app.post('/signUp', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) { 
    return res.status(400).send({ msg: 'Fill in all fields' });
  }

  try { 
    const existingUser = await schema.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ msg: 'Email is already registered' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).send({ msg: 'Invalid email format' });
    }

    if (username.length > 20) {
      return res.status(400).send({ msg: 'Username is greater than 20 characters' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const customerId = uuidv4();

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); 

    const createUser = new schema({
      username,
      email,
      password: hashedPassword,
      customer_id: customerId,
      otp,
      otpExpires,
    });

    await createUser.save();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL, 
        pass: process.env.PASS, 
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Your OTP for registration',
      text: `Your OTP is ${otp}. It is valid for 10 minutes.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).send({ msg: 'Error sending OTP' });
      }
      console.log('Email sent: ' + info.response);
      res.status(201).send({ msg: 'New user created and OTP sent to email' });
    });

  } catch (error) {
    console.log("error", error);
    res.status(500).send({ msg: 'Server error' });
  }
});

app.post('/verifyOTP', async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await schema.findOne({ email });

    if (!user) {
      return res.status(400).send({ msg: 'User not found' });
    }

    if (user.otp !== otp || user.otpExpires < new Date()) {
      return res.status(400).send({ msg: 'Invalid or expired OTP' });
    }

    // OTP is valid, clear it from the database
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    res.status(200).send({ msg: 'OTP verified successfully' });
  } catch (error) {
    console.log("error", error);
    res.status(500).send({ msg: 'Server error' });
  }
});

module.exports = app;










// const express = require('express');
// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
// const { v4: uuidv4 } = require('uuid');
// const nodemailer = require('nodemailer');
// const schema = require('./Models/user.model');

// const app = express();

// app.use(express.json());

// app.post('/signUp', async (req, res) => {
//   const { username, email, password } = req.body;

//   if (!username || !email || !password) { // If any fields are empty
//     return res.status(400).send({ msg: 'Fill in all fields' });
//   }

//   try { // Check if user already exists
//     const existingUser = await schema.findOne({ email });
//     if (existingUser) {
//       return res.status(400).send({ msg: 'Email is already registered' });
//     }

//     // Validate email
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       return res.status(400).send({ msg: 'Invalid email format' });
//     }

//     // Validate username
//     if (username.length > 20) {
//       return res.status(400).send({ msg: 'Username is greater than 20 characters' });
//     }

//     // Hash password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // Create unique ID
//     const customerId = uuidv4();

//     // Generate OTP and its expiration time
//     const otp = Math.floor(100000 + Math.random() * 900000).toString();
//     const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

//     // Create a new user
//     const createUser = new schema({
//       username,
//       email,
//       password: hashedPassword,
//       customer_id: customerId,
//       otp,
//       otpExpires,
//     });

//     await createUser.save();

//     // Send OTP to user's email
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: process.env.EMAIL, // Your email id
//         pass: process.env.PASS, // Your password
//       },
//     });

//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: email,
//       subject: 'Your OTP for registration',
//       text: `Your OTP is ${otp}. It is valid for 10 minutes.`,
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.log(error);
//         return res.status(500).send({ msg: 'Error sending OTP' });
//       }
//       console.log('Email sent: ' + info.response);
//       res.status(201).send({ msg: 'New user created and OTP sent to email' });
//     });

//   } catch (error) {
//     console.log("error", error);
//     res.status(500).send({ msg: 'Server error' });
//   }
// });

// module.exports = app;
