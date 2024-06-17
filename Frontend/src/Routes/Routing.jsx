import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../Pages/Home';
import Signup from "../components/Signup";
import Hotels from '../Pages/Hotels';
import { AuthProvider } from '../Context/Auth_Context';
import Login from '../components/Login';
import HotelInfoPage from '../Pages/HotelInfoPage';
import CheckoutForm from '../components/CheckoutForm';
import HolidayHome from '../Pages/HolidayHome';
import ProfileSection from '../components/ProfileSection';
import ContactUs from '../components/ContactUs';
import Holidays from '../Pages/Holidays';
import HolidayInfoPage from '../Pages/HolidayInfoPage';
import HolidayImgSection from '../ComponentHoliday/HolidayImgSection';
import HolidayCheckout from '../ComponentHoliday/HolidayCheckout';
import HolidayOrderHistory from '../ComponentHoliday/HolidayOrderHistory';
import Events from '../Pages/Events'
import EventsSinglePage from '../ComponentEvents/EventsSinglePage';
import EventCheckout from '../ComponentEvents/EventCheckout';
import ThankyouPage from '../components/ThankyouPage';
import ForgotPass from '../Pages/ForgotPass';
import ResetPasswordForm from '../Pages/ResetPasswordForm';
import LocationDetails from '../Pages/AllDetails';
import OTPVerification from '../Pages/OTPVerification';



const Routing = () => {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Hotel Routes */}
            <Route exact path='/' element={<Home />} />
            <Route exact path='/signup' element={<Signup />} />
            <Route exact path='/login' element={<Login />} />
            {/* <Route path='/forgotpass' element={<ForgotPass />} /> */}
            {/* <Route path='/resetpass' element={<ResetPasswordForm />} /> */}
            <Route path="/location/:selectedLocation" element={<LocationDetails />} />
            

            <Route path="/forgot-password" element={<ForgotPass />} />
            <Route path="/reset-password/:token" element={<ResetPasswordForm />} />
            <Route exact path='/hotels/location/:selectedLocation' element={<Hotels />} />
            <Route path="/hotels/:hotelName" element={<HotelInfoPage />} />
            <Route path="/checkout/:hotelName" element={<CheckoutForm />} />
            {/* <Route path="/hotelOrderHistory" element={<HotelOrderHistory />} /> */}

      
            {/* For Holiday Route */}
            <Route exact path='/holidaypackages' element={<HolidayHome />} />
            <Route exact path='/holidaypackages/location/:selectedLocation' element={<Holidays />} />
            <Route exact path='/holidaypackages/:packageName' element={<HolidayInfoPage /> }/>
            <Route exact path='/holidaypackages/checkout/:packageName' element={<HolidayCheckout/>} />
            <Route exact path='/bookinghistory' element={<HolidayOrderHistory/>} />

       
            

            {/* For Events Route */}
            <Route path="/events" element={<Events />} />
            <Route path="/events/:eventName" element={<EventsSinglePage />} />
            {/* <Route path='/checkoutevent' element={<EventCheckout/>}/> */}
            <Route path="/events/checkout/:eventName" element={<EventCheckout />} />



            <Route path='/profile' element={<ProfileSection />} />
            <Route path='/contact' element={<ContactUs />} />
            <Route path='/thankyou/:razorpay_order_id' element={<ThankyouPage />} />
            <Route path="/otpVerification" element={<OTPVerification />} />



          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
};

export default Routing;