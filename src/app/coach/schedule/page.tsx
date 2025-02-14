/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { EventContentArg } from '@fullcalendar/core';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from "@/components/ui/drawer";

interface Booking {
  id: string;
  user_name: string;
  service: string;
  date: string;
}

export default function SchedulesPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const { user } = useUser();
  const coachId = user?.fullName;
  const [selectedEvent, setSelectedEvent] = useState<{ user_name: string; service: string; startTime: string } | null>(null);

  useEffect(() => {
    if (!coachId) return;

    const fetchBookings = async () => {
      try {
        const response = await fetch(`/api/get-bookings?coach=${coachId}`);
        const data = await response.json();
        if (!data.error) {
          setBookings(
            data.map((b: Booking) => ({
              id: b.id,
              user_name: b.user_name,
              service: b.service,
              title: `${b.user_name} - ${b.service}`,
              start: b.date,
            }))
          );
        }
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, [coachId]);

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek',
        }}
        editable={false}
        events={bookings}
        eventContent={(eventInfo) => renderEventContent(eventInfo, setSelectedEvent)}
        contentHeight="auto"
        height="auto"
        handleWindowResize
        dayHeaderContent={(args) => args.text.charAt(0)} // Always show first letter of day
        dayHeaderClassNames="my-day-header"
      />

      {/* ShadCN Drawer for Event Details */}
      <Drawer open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Booking Details</DrawerTitle>
            <DrawerDescription>
              {selectedEvent && (
                <>
                  <p><strong>User:</strong> {selectedEvent.user_name}</p>
                  <p><strong>Service:</strong> {selectedEvent.service}</p>
                  <p><strong>Time:</strong> {selectedEvent.startTime}</p>
                </>
              )}
            </DrawerDescription>
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
    </>
  );
}

// Custom event content rendering function
function renderEventContent(eventInfo: EventContentArg, setSelectedEvent: (event: any) => void) {
  const { event } = eventInfo;
  const user_name = event.extendedProps.user_name;
  const service = event.title.split(' - ')[1];
  const startTime = event.start?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // Open drawer on click (for all devices)
  const handleClick = () => {
    setSelectedEvent({ user_name, service, startTime });
  };

  return (
    <div
      onClick={handleClick}
      className="p-1 rounded bg-green-500 text-white text-center cursor-pointer"
      style={{ fontSize: '14px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
    >
      {user_name}
    </div>
  );
}
