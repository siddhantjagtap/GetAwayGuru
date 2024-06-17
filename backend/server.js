require('dotenv').config();
const Razorpay = require('razorpay');
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const {ValidateOrder} = require("./ValidateOrder.js")
const {ValidatePackageOrder} = require("./ValidatePackageOrder.js")
const {ValidateEventOrder} = require("./ValidateEventOrder.js")
const port = process.env.PORT;
const app = express();
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: false }));

const URL = process.env.MONGO_URL;
mongoose.connect(URL)
.then(()=> console.log('Mongo Connected!'))
.catch(err => console.error('MongoDB connection error:', err));


const register = require("./registration");
const userLoginRouter = require("./login");
const hotelList = require('./HotelList.js')
const forgetpassword = require('./ForgetPassword.js')
const createorder = require('./CreateOrder.js')
const packages = require('./HolidayPackage.js')
const events = require('./Events.js')
const resetpassword = require('./ResetPassword.js')
const profileupload = require('./profileimageupload.js')


app.use("/api", register);
app.use("/api", userLoginRouter);
app.use('/api' ,hotelList)
app.use('/api', forgetpassword)
app.use('/api', createorder)
app.use('/api', packages)
app.use('/api', events)
app.use('/api', resetpassword)
app.use('/api', profileupload)

app.get("/", (req, res) => {
  res.send("Aur kiya scene haiiiii!!!!!!!!!!, happy birthday");  //{msg: done}
});

app.get("/api/signUp", (req, res) => {
  res.send("sign up is working");  //{msg: done}
});

app.get("/api/login", (req, res) => {
  res.send("login is working");
}); 

app.get("/api/forgot-password", (req, res) => {
  res.send("Forget password is working");
});

app.get("/api/reset-password", (req,res)=>{
  res.send("reset kar")
})
 
app.get('/api/hotels', (req,res)=>{
  res.send("hotels list")
})

app.get('/api/booking/createorder', (req,res)=>{
  res.send("i am node js")
})

app.get('/api/holidaypackages', (req,res)=>{
  res.send('its working');
})

app.get('/api/events', (req, res)=>{
  res.send('hey its working')
})

// Define the /api/order/validate route
app.post('/api/order/validate', async (req, res) => {
  try {
    await ValidateOrder(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

app.post('/api/order/validatepackageorder', async (req, res) => {
  try {
    await ValidatePackageOrder(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

app.post('/api/order/validateeventorder', async (req, res) => {
  try {
    await ValidateEventOrder(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// app.listen(port, () => {
//   console.log(`Server listening on port ${port}`);
// });

app.listen();

