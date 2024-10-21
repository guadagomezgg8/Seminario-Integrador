import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/login';
import Register from './pages/Register';
import Home from './pages/Home';
import ComplexSearch from './pages/ComplexSearch';
import FieldSearch from './pages/FieldSearch';
import Booking from './pages/Booking';
import Profile from './pages/Profile';
import MyBookings from './pages/MyBookings';
import FieldDetails from './pages/FieldDetails';
import FieldRegistration from './pages/FieldRegistration';
import ComplexRegistration from './pages/ComplexRegistration';
import DashboardAdmin from './pages/DashboardAdmin';
import BookingStatistics from './pages/BookingStatistics';

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen w-full bg-gray-100">
        <Navbar />
        
        <main className="flex-grow w-full px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/complex-search" element={<ComplexSearch />} />
            <Route path="/field-search" element={<FieldSearch />} />
            <Route path="/field-details/:id" element={<FieldDetails />} />

            <Route path="/booking/:id" element={<Booking />} />
            <Route path="/admin/field-registration" element={<FieldRegistration />} />
            <Route path="/admin/complex-registration" element={<ComplexRegistration />} />
            <Route path="/admin" element={<DashboardAdmin />} />
            <Route path="/admin/booking-statistics" element={<BookingStatistics />} />




            <Route path="/profile" element={<Profile />} />
            <Route path="/my-bookings" element={<MyBookings />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}