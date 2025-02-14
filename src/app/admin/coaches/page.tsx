'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { EventDropArg, EventContentArg } from '@fullcalendar/core'; // Import EventDropArg from FullCalendar

interface Booking {
  id: string;
  user_name: string;
  service: string;
  date: string; 
}

export default function CoachesPage() {
  const [coaches, setCoaches] = useState<string[]>([]);
  const [selectedCoach, setSelectedCoach] = useState<string>('');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const { user } = useUser();
  const isAdmin = user?.publicMetadata?.role === 'admin';

  useEffect(() => {
    const fetchCoaches = async () => {
      try {
        const response = await fetch('/api/get-coaches');
        const data = await response.json();
        if (!data.error) {
          setCoaches(data);
          setSelectedCoach(data[0]);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchCoaches();
  }, []);

  useEffect(() => {
    if (!selectedCoach) return;

    const fetchBookings = async () => {
      try {
        const response = await fetch(`/api/get-bookings?coach=${selectedCoach}`);
        const data = await response.json();
        if (!data.error) {
          setBookings(
            data.map((b: Booking) => ({
              id: b.id,
              user_name: b.user_name,
              title: `${b.user_name} - ${b.service}`,
              start: b.date,
            }))
          );
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchBookings();
  }, [selectedCoach]);

  // Fixing the handleEventDrop function by typing eventDropInfo as EventDropArg
  const handleEventDrop = async (eventDropInfo: EventDropArg) => {
    const event = eventDropInfo.event;
    if (!event.start) return;

    const newDate = event.start.toISOString();
    console.log(`Moved event: ${event.title} to ${newDate}`);

    // Send PUT request to update the booking date
    const response = await fetch('/api/edit-schedule', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        bookingId: event.id,
        newDate: newDate,
      }),
    });

    if (!response.ok) {
      console.error('Failed to update the booking');
    }
  };

  return (
    <div className="p-0 md:p-4">
      {isAdmin && (
        <select
          className="p-0 border rounded mb-4"
          value={selectedCoach}
          onChange={(e) => setSelectedCoach(e.target.value)}
        >
          {coaches.map((coach) => (
            <option key={coach} value={coach}>
              {coach}
            </option>
          ))}
        </select>
      )}

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek',
        }}
        editable={true}
        events={bookings}
        height="auto"
        handleWindowResize
        dayHeaderContent={(args) => args.text.charAt(0)} 
        eventDrop={handleEventDrop} 
        eventContent={renderEventContent}
      />
    </div>
  );
}

// Custom event content rendering function
function renderEventContent(eventInfo: EventContentArg) {
  const { event } = eventInfo;

  const user_name = event.extendedProps.user_name;
  const service = event.title.split(' - ')[1];
  const startTime = event.start?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div style={{ fontSize: '16px', wordWrap: 'break-word', whiteSpace: 'normal' }}>
      <div>{user_name}</div>
      <div>{service}</div>
      <div>{startTime}</div>
    </div>
  );
}
