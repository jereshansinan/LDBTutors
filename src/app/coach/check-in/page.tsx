'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';

type Booking = {
  id: string;
  user_name: string;
  service: string;
  location: string;
  coach_name: string;
  date: string; 
  time_slot: string;
  status: string;
  coach_check_in: boolean;
};

export default function CheckInPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const { user } = useUser(); 
  const isCoach = user?.publicMetadata?.role === 'coach';

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('/api/add-booking');
        const data = await response.json();
        if (!data.error) {
          setBookings(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchBookings();
  }, []);

  const isCurrentBooking = (date: string, time_slot: string) => {
    const now = new Date();
    const bookingDate = new Date(date);
    const currentTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
      bookingDate.toDateString() === now.toDateString() &&
      currentTime === time_slot
    );
  };

  return (
    <div className="overflow-x-auto border border-gray-300 rounded-lg shadow-md">
      <table className="w-full text-sm text-left text-gray-700">
        <thead className="text-xs uppercase bg-gray-100">
          <tr>
            <th className="px-6 py-3">ID</th>
            <th className="px-6 py-3">Client</th>
            <th className="px-6 py-3">Coach</th>
            <th className="px-6 py-3">Location</th>
            <th className="px-6 py-3">Date</th>
            <th className="px-6 py-3">Service</th>
            <th className="px-6 py-3">Time Slot</th>
            {!isCoach && <th className="px-6 py-3">Status</th>} 
            {isCoach && <th className="px-6 py-3">Check-in</th>}
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr className="border-b" key={booking.id}>
              <td className="px-6 py-4 font-medium">{booking.id}</td>
              <td className="px-6 py-4">{booking.user_name}</td>
              <td className="px-6 py-4">{booking.coach_name}</td>
              <td className="px-6 py-4">{booking.location}</td>
              <td className="px-6 py-4">{new Date(booking.date).toLocaleDateString()}</td>
              <td className="px-6 py-4">{booking.service}</td>
              <td className="px-6 py-4">{booking.time_slot}</td>
              {!isCoach && <td className="px-6 py-4">{booking.status}</td>} 
              {isCoach && (
                <td className="px-6 py-4">
                  <button
                    className={`px-4 py-2 text-white font-medium rounded-md transition 
                      ${isCurrentBooking(booking.date, booking.time_slot) ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-400 cursor-not-allowed'}
                    `}
                    disabled={!isCurrentBooking(booking.date, booking.time_slot)}
                  >
                    Check-in
                  </button>
                </td>
              )}
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
