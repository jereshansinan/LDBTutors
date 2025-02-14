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
    <div className="mx-2 mt-3 overflow-x-auto border border-gray-300 rounded-lg shadow-md">
      <table className="w-full text-xs sm:text-sm text-left text-gray-700">
        <thead className="text-[10px] sm:text-xs uppercase bg-gray-100">
          <tr>
            <th className="px-3 py-2 sm:px-6 sm:py-3">ID</th>
            <th className="px-3 py-2 sm:px-6 sm:py-3">Coach</th>
            <th className="px-3 py-2 sm:px-6 sm:py-3">Date</th>
            <th className="px-3 py-2 sm:px-6 sm:py-3">Service</th>
            <th className="px-3 py-2 sm:px-6 sm:py-3">Location</th>
            <th className="px-3 py-2 sm:px-6 sm:py-3">Time Slot</th>
            {!isCoach && <th className="px-3 py-2 sm:px-6 sm:py-3">Status</th>}
            <th className="px-3 py-2 sm:px-6 sm:py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr className="border-b" key={booking.id}>
              <td className="px-3 py-2 sm:px-6 sm:py-4 font-medium">{booking.id}</td>
              <td className="px-3 py-2 sm:px-6 sm:py-4">{booking.coach_name}</td>
              <td className="px-3 py-2 sm:px-6 sm:py-4">{new Date(booking.date).toLocaleDateString()}</td>
              <td className="px-3 py-2 sm:px-6 sm:py-4">{booking.service}</td>
              <td className="px-3 py-2 sm:px-6 sm:py-4">{booking.location}</td>
              <td className="px-3 py-2 sm:px-6 sm:py-4">{booking.time_slot}</td>
              {!isCoach && (
                <td className="px-3 py-2 sm:px-6 sm:py-4 capitalize">
                  <span
                    className={`px-3 py-1 rounded-full text-white text-sm`}
                    style={{
                      backgroundColor:
                        booking.status === "completed"
                          ? "rgba(0, 182, 155, 0.2)"
                          : booking.status === "processing"
                            ? "rgba(98, 38, 239, 0.2)"
                            : "rgba(239, 56, 38, 0.2)",
                      color:
                        booking.status === "completed"
                          ? "#00B69B"
                          : booking.status === "processing"
                            ? "#6226EF"
                            : "#EF3826",
                    }}
                  >
                    {booking.status}
                  </span>
                </td>
              )}


              <td className="px-3 py-2 sm:px-6 sm:py-4">
                {booking.status === 'processing' && (
                  <button
                    onClick={() => handleDelete(booking.id)}
                    className="px-3 py-1 sm:px-4 sm:py-2 text-white bg-red-500 hover:bg-red-600 font-medium rounded-md transition text-xs sm:text-sm"
                  >
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
