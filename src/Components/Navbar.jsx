import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom';

const Navbar = () => {

    const navigate=useNavigate();
  return (
    <div className='flex justify-between bg-black text-white p-3'>
    <div onClick={()=>{navigate('/')}}>Home</div>
    <div onClick={()=>{navigate('/BookingRooms')}}>Reserved Rooms</div>
    </div>
    
  )
}

export default Navbar