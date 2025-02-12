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

export default function BookingPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [coaches, setCoaches] = useState<string[]>([]);
  const { user } = useUser();
  const isAdmin = user?.publicMetadata?.role === 'admin';
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

    const fetchCoaches = async () => {
      try {
        const response = await fetch('/api/get-coaches'); // Fetch coaches from the coaches table
        const data = await response.json();
        if (!data.error) {
          setCoaches(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchBookings();
    if (isAdmin) {
      fetchCoaches();
    }
  }, [isAdmin]);

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

  const handleCoachChange = async (bookingId: string, newCoach: string) => {
    try {
      const response = await fetch('/api/add-booking', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingId, newCoach }),
      });

      const data = await response.json();
      if (!data.error) {
        setBookings((prevBookings) =>
          prevBookings.map((b) =>
            b.id === bookingId ? { ...b, coach_name: newCoach } : b
          )
        );
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
              <td className='text-black'>
                {isAdmin ? (
                  <select
                    value={booking.coach_name}
                    onChange={(e) => handleCoachChange(booking.id, e.target.value)}
                  >
                    {coaches.map((coach) => (
                      <option key={coach} value={coach}>
                        {coach}
                      </option>
                    ))}
                  </select>
                ) : (
                  booking.coach_name
                )}
              </td>
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
