import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './css/global.css';
import Profile from './pages/Profile/Profile';
import Hotel from './pages/Hotel/Hotel';
import Travel from './pages/Travel/Travel';
import Ticket from './pages/Ticket/Ticket';
import Navbar from './pages/layouts/Navbar';
import Footer from './pages/layouts/Footer';
import Hotellist from './pages/Hotel/Hotellist';
import HotelDetail from './pages/Hotel/HotelDetail';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HotelDetail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/travel" element={<Travel />} />
          <Route path="/ticket" element={<Ticket />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
