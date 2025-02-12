'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';

type Booking = {
  id: string;
  service: string;
  location: string;
  coach_name: string;
  date: string; 
  time_slot: string;
  status: string;
  coach_check_in: boolean;
};

export default function HistoryPage() {
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

  const handleDelete = async (bookingId: string) => {
    try {
      const response = await fetch('/api/add-booking', {
        method: 'DELETE',
        body: JSON.stringify({ bookingId }),
      });
      const data = await response.json();
      if (!data.error) {
        setBookings((prevBookings) => prevBookings.filter((b) => b.id !== bookingId));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Service</th>
            <th>Location</th>
            <th>Coach</th>
            <th>Date</th>
            <th>Time Slot</th>
            {!isCoach && <th>Status</th>} 
            {isCoach && <th>Check-in</th>}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td>{booking.service}</td>
              <td>{booking.location}</td>
              <td>{booking.coach_name}</td>
              <td>{new Date(booking.date).toLocaleDateString()}</td>
              <td>{booking.time_slot}</td>
              {!isCoach && <td>{booking.status}</td>} 
              {isCoach && (
                <td>
                  <button>Check-in</button>
                </td>
              )}
              <td>
                {booking.status !== 'completed' && (
                  <button onClick={() => handleDelete(booking.id)}>Delete</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
