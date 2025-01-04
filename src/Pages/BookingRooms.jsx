import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookingRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch room and booking data from the backend
    const fetchBookings = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/v1/bookings');
        setRooms(response.data);
      } catch (err) {
        setError('Failed to fetch booking data');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold text-center mb-6">Booked Rooms</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rooms.length > 0 ? (
          rooms.map((room) => (
            <div key={room._id} className="bg-white p-4 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold">Room {room.roomNumber}</h2>
              <p><strong>Type:</strong> {room.type}</p>
              <p><strong>Capacity:</strong> {room.roomCapacity} people</p>
              <p><strong>Floor:</strong> {room.floorNumber}</p>
              <p><strong>Bookings:</strong></p>
              {room.bookings.length > 0 ? (
                room.bookings.map((booking, index) => (
                  <div key={index} className="mt-2 p-2 border-b">
                    <p><strong>Booking Time:</strong> {new Date(booking.from).toLocaleString()} to {new Date(booking.to).toLocaleString()}</p>
                    <p><strong>Customer:</strong> {booking.bookedUser.Name}</p>
                    <p><strong>Email:</strong> {booking.bookedUser.Email}</p>
                    <p><strong>Phone:</strong> {booking.bookedUser.Phone}</p>
                  </div>
                ))
              ) : (
                <p>No bookings available for this room.</p>
              )}
            </div>
          ))
        ) : (
          <p>No rooms found.</p>
        )}
      </div>
    </div>
  );
};

export default BookingRooms;
