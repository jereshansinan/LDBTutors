'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';

type Booking = {
  id: string;
  service: string;
  user_name: string;
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
  const [selectedService, setSelectedService] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const { user } = useUser();
  const isAdmin = user?.publicMetadata?.role === 'admin';
  const isCoach = user?.publicMetadata?.role === 'coach';
  const [translations, setTranslations] = useState({
    bookingPage: {
      filterBy: "Filter By",
      service: "Service",
      status: "Status",
      resetFilter: "Reset Filter",
      tableHeaders: {
        id: "ID",
        client: "Client",
        coach: "Coach",
        location: "Location",
        date: "Date",
        service: "Service",
        timeSlot: "Time Slot",
        checkedIn: "Checked In",
        actions: "Actions",
        checkIn: "Check-in",
        status: "Status"
      },
      statusOptions: {
        processing: "Processing",
        completed: "Completed",
        canceled: "Canceled",
      },
      deleteButton: "Delete",
    },
  });

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
        const response = await fetch('/api/get-coaches');
        const data = await response.json();
        if (!data.error) {
          setCoaches(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const fetchTranslations = async () => {
      const language = localStorage.getItem("language") || "en";
      const response = await fetch(`/locales/${language}.json`);
      const data = await response.json();
      setTranslations(data);
    };

    fetchBookings();
    fetchTranslations();
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

  const handleStatusChange = async (bookingId: string, newStatus: string) => {
    try {
      const response = await fetch('/api/add-booking', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingId, newStatus }),
      });

      const data = await response.json();
      if (!data.error) {
        setBookings((prevBookings) =>
          prevBookings.map((b) =>
            b.id === bookingId ? { ...b, status: newStatus } : b
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-[#00B69B] text-white';
      case 'processing':
        return 'bg-[#6226EF] text-white';
      case 'canceled':
        return 'bg-[#EF3826] text-white';
      default:
        return 'bg-gray-200';
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    const matchesService = selectedService ? booking.service === selectedService : true;
    const matchesStatus = selectedStatus ? booking.status === selectedStatus : true;
    
    return matchesService && matchesStatus;
  });
  

  const services = [
    "Field Training (1 on 1)",
    "Strength & Conditioning (1 on 1)",
    "Field Training ( Group, 4 sessions/mo. )",
    "Field Training ( Group, 8 sessions/mo. )",
    "Field Training ( Group, 12 sessions/mo. )",
    "Strength and Conditioning ( Group of 3, 4 sessions/mo. )",
    "Strength and Conditioning ( Group of 3, 8 sessions/mo. )",
    "Strength and Conditioning ( Group of 3, 12 sessions/mo. )",
    "Standard Package",
    "Elite Package",
    "Athlete Assessment and Profiling",
    "Online Training Program",
    "Injury Assessment + FMS Assessment",
    "Lifestyle Assessment",
    "Rehabilitation",
    "Recovery",
  ];

  return (
    <>
      <div className="flex justify-between items-center p-2 sm:p-4 bg-white rounded-t-lg">
        <div className="flex items-center space-x-2 sm:space-x-4">
          <span className="font-medium text-gray-700 text-xs sm:text-sm">
            {translations.bookingPage.filterBy}
          </span>
          <div className="flex space-x-2 sm:space-x-4">
            <div className="relative">
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="border rounded px-2 py-1 text-xs sm:px-3 sm:py-2 sm:text-sm"
              >
                <option value="">{translations.bookingPage.service}</option>
                {services.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="border rounded px-2 py-1 text-xs sm:px-3 sm:py-2 sm:text-sm"
              >
                <option value="">{translations.bookingPage.status}</option>
                <option value="processing">
                  {translations.bookingPage.statusOptions.processing}
                </option>
                <option value="completed">
                  {translations.bookingPage.statusOptions.completed}
                </option>
                <option value="canceled">
                  {translations.bookingPage.statusOptions.canceled}
                </option>
              </select>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            setSelectedService('');
            setSelectedStatus('');
          }}
          className="px-3 py-1 sm:px-4 sm:py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md text-xs sm:text-sm"
        >
          {translations.bookingPage.resetFilter}
        </button>
      </div>

      <div className="overflow-x-auto border border-gray-300 rounded-lg shadow-md">
        <table className="w-full text-xs sm:text-sm text-left text-gray-700">
          <thead className="text-[10px] sm:text-xs uppercase bg-gray-100">
            <tr>
              <th className="px-3 py-2 sm:px-6 sm:py-3">
                {translations.bookingPage.tableHeaders.id}
              </th>
              <th className="px-3 py-2 sm:px-6 sm:py-3">
                {translations.bookingPage.tableHeaders.client}
              </th>
              <th className="px-3 py-2 sm:px-6 sm:py-3">
                {translations.bookingPage.tableHeaders.coach}
              </th>
              <th className="px-3 py-2 sm:px-6 sm:py-3">
                {translations.bookingPage.tableHeaders.location}
              </th>
              <th className="px-3 py-2 sm:px-6 sm:py-3">
                {translations.bookingPage.tableHeaders.date}
              </th>
              <th className="px-3 py-2 sm:px-6 sm:py-3">
                {translations.bookingPage.tableHeaders.service}
              </th>
              <th className="px-3 py-2 sm:px-6 sm:py-3">
                {translations.bookingPage.tableHeaders.timeSlot}
              </th>
              <th className="px-3 py-2 sm:px-6 sm:py-3 text-center">
                {translations.bookingPage.tableHeaders.checkedIn}
              </th>
              {!isCoach && (
                <th className="px-3 py-2 sm:px-6 sm:py-3">
                  {translations.bookingPage.tableHeaders.status}
                </th>
              )}
              {isCoach && (
                <th>{translations.bookingPage.tableHeaders.checkIn}</th>
              )}
              <th className="px-3 py-2 sm:px-6 sm:py-3">
                {translations.bookingPage.tableHeaders.actions}
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map((booking) => (
              <tr className="border-b" key={booking.id}>
                <td className="px-3 py-2 sm:px-6 sm:py-4 font-medium">
                  {booking.id}
                </td>
                <td className="px-3 py-2 sm:px-6 sm:py-4">
                  {booking.user_name}
                </td>
                <td className="px-3 py-2 sm:px-6 sm:py-4">
                  {isAdmin ? (
                    <select
                      value={booking.coach_name}
                      onChange={(e) => handleCoachChange(booking.id, e.target.value)}
                      className="border rounded px-1 py-1 sm:px-2 sm:py-1 text-xs sm:text-sm"
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
                <td className="px-3 py-2 sm:px-6 sm:py-4">
                  {booking.location}
                </td>
                <td className="px-3 py-2 sm:px-6 sm:py-4">
                  {new Date(booking.date).toLocaleDateString()}
                </td>
                <td className="px-3 py-2 sm:px-6 sm:py-4">
                  {booking.service}
                </td>
                <td className="px-3 py-2 sm:px-6 sm:py-4">
                  {booking.time_slot}
                </td>
                <td className="px-3 py-2 sm:px-6 sm:py-4 text-center">
                  <input
                    type="checkbox"
                    checked={booking.coach_check_in}
                    readOnly
                    className="w-4 h-4 sm:w-5 sm:h-5 accent-[#75E379] cursor-not-allowed"
                  />
                </td>

                {!isCoach && (
                  <td className="px-3 py-2 sm:px-6 sm:py-4">
                    {isAdmin ? (
                      <select
                        value={booking.status}
                        onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                        className={`border rounded px-1 py-1 sm:px-2 sm:py-1 text-xs sm:text-sm ${getStatusClass(
                          booking.status
                        )}`}
                      >
                        <option value="processing">
                          {translations.bookingPage.statusOptions.processing}
                        </option>
                        <option value="completed">
                          {translations.bookingPage.statusOptions.completed}
                        </option>
                        <option value="canceled">
                          {translations.bookingPage.statusOptions.canceled}
                        </option>
                      </select>
                    ) : (
                      <span
                        className={`px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium ${getStatusClass(
                          booking.status
                        )}`}
                      >
                        {booking.status}
                      </span>
                    )}
                  </td>
                )}
                {isCoach && (
                  <td className="px-3 py-2 sm:px-6 sm:py-4">
                    <button className="px-3 py-1 sm:px-4 sm:py-2 text-white bg-blue-500 hover:bg-blue-600 font-medium rounded-md transition text-xs sm:text-sm">
                      {translations.bookingPage.tableHeaders.checkIn}
                    </button>
                  </td>
                )}
                <td className="px-3 py-2 sm:px-6 sm:py-4">
                  {booking.status !== 'completed' && (
                    <button
                      onClick={() => handleDelete(booking.id)}
                      className="px-3 py-1 sm:px-4 sm:py-2 text-white bg-red-500 hover:bg-red-600 font-medium rounded-md transition text-xs sm:text-sm"
                    >
                      {translations.bookingPage.deleteButton}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}