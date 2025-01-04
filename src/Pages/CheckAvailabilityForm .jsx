import React, { useState } from "react";
import axios from "axios";

// Helper function to format date-time
const formatDateTime = (dateTime) => {
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
    };
    return new Date(dateTime).toLocaleString("en-US", options);
};

const CheckAvailabilityForm = () => {
    const [formData, setFormData] = useState({
        from: "",
        to: "",
        guests: "",
    });
    const [userInfo, setUserInfo] = useState({
        Name: "",
        Email: "",
        Phone: "",
        from: "",
        to: "",
        roomId: "",
    });
    const [availableRooms, setAvailableRooms] = useState([]);
    const [bookingFormOpenStatus, setBookingFormOpenStatus] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [bookingRoom, setBookingRoom] = useState({});

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        setUserInfo({
            ...userInfo,
            [name]: value
        });
    };

    const handleUserInfoChange = (e) => {
        const { name, value } = e.target;
        setUserInfo({
            ...userInfo,
            [name]: value,
        });
    }

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        setAvailableRooms([]);

        try {
            const response = await axios.post("https://restaurant-booking-system-serverside.onrender.com/api/v1/checkAvailability", formData);
            setAvailableRooms(response.data.availableRooms);
        } catch (err) {
            setError("Failed to fetch available rooms.");
        } finally {
            setLoading(false);
        }
    };

    const toggleBooking = (room) => {
        setBookingFormOpenStatus(!bookingFormOpenStatus);
        setBookingRoom(room);
        setUserInfo({
            ...userInfo,
            roomId: room._id,
        });
        
    };

    const reserveTable = async (e) => {
        try {
            e.preventDefault();
            const { Name, Email, Phone, from, to } = userInfo;
            const payload = { Name, Email, Phone, from, to };
            const response = await axios.patch(`https://restaurant-booking-system-serverside.onrender.com/api/v1/bookRoom/${bookingRoom.roomNumber}`, payload);
            setBookingFormOpenStatus(false);
            setError(null);
            setBookingRoom({});
            alert("Room booked successfully!");
            setAvailableRooms([]);
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred.");
        }
    }

    return (
        <div className="container mx-auto p-4 bg-gray-100 rounded-lg shadow-lg">
            <h1 className="text-3xl font-semibold text-center mb-6">Check Room Availability</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col">
                    <label htmlFor="from" className="text-lg">From:</label>
                    <input
                        type="datetime-local"
                        name="from"
                        value={formData.from}
                        onChange={handleChange}
                        required
                        className="p-2 border rounded-md"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="to" className="text-lg">To:</label>
                    <input
                        type="datetime-local"
                        name="to"
                        value={formData.to}
                        onChange={handleChange}
                        required
                        className="p-2 border rounded-md"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="guests" className="text-lg">Number of Persons:</label>
                    <input
                        type="number"
                        name="guests"
                        value={formData.guests}
                        onChange={handleChange}
                        required
                        className="p-2 border rounded-md"
                    />
                </div>

                <div className="text-center">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-700"
                    >
                        {loading ? "Checking..." : "Check Availability"}
                    </button>
                </div>
            </form>

            {/* Error Message */}
            {error && <p className="text-red-500 text-center mt-4">{error}</p>}

            {/* Available Rooms */}
            {availableRooms.length > 0 && (
                <div className="mt-6">
                    <h2 className="text-2xl font-semibold">Available Rooms:</h2>
                    <ul className="space-y-4">
                        {availableRooms.map((room) => (
                            <li key={room.roomNumber} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
                                <div>
                                    <strong>Room {room.roomNumber}</strong>
                                    <p>Type: {room.type} | Capacity: {room.roomCapacity} | Rate: ₹{room.payPerHour}/hr</p>
                                </div>
                                <button
                                    className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700"
                                    onClick={() => toggleBooking(room)}
                                >
                                    Book this Room
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* No Rooms Available */}
            {!loading && !error && availableRooms.length === 0 && (
                <p className="text-center text-gray-500 mt-4">No rooms available for the selected time range. Maximum 5 persons per room allowed.</p>
            )}

            {/* Booking Form */}
            {bookingFormOpenStatus && (
                <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
                    <h2 className="text-xl font-semibold">Booking Room: {bookingRoom.roomNumber}</h2>
                    <h3 className="mt-2">Booking Time: {formatDateTime(formData.from)} to {formatDateTime(formData.to)}</h3>

                    <form onSubmit={reserveTable} className="space-y-4 mt-4">
                        <div>
                            <label htmlFor="Name" className="block text-lg">Name:</label>
                            <input
                                type="text"
                                name="Name"
                                required
                                onChange={handleUserInfoChange}
                                className="p-2 border rounded-md w-full"
                            />
                        </div>

                        <div>
                            <label htmlFor="Email" className="block text-lg">Email:</label>
                            <input
                                type="email"
                                name="Email"
                                required
                                onChange={handleUserInfoChange}
                                className="p-2 border rounded-md w-full"
                            />
                        </div>

                        <div>
                            <label htmlFor="Phone" className="block text-lg">Phone:</label>
                            <input
                                type="tel"
                                name="Phone"
                                required
                                onChange={handleUserInfoChange}
                                className="p-2 border rounded-md w-full"
                            />
                        </div>

                        <div className="text-center">
                            <button
                                type="submit"
                                className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-700"
                            >
                                Book Now
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default CheckAvailabilityForm;
