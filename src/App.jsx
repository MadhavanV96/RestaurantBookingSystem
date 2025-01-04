import React from 'react'
import Navbar from './Components/Navbar'
import { BrowserRouter, Routes, Route } from "react-router";
import Home from './Pages/Home';
import CheckAvailabilityForm from './Pages/CheckAvailabilityForm ';
import BookingRooms from './Pages/BookingRooms';


const App = () => {
  return (
    <div>
     
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<CheckAvailabilityForm />} />
        <Route path="/BookingRooms" element={<BookingRooms />} />
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App