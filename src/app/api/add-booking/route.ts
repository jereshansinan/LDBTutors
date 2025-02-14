import { currentUser } from "@clerk/nextjs/server";
import { createClient } from '@supabase/supabase-js';
import { NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// POST method for adding a booking
export async function POST(req: Request) {
  try {
    const user = await currentUser();
    const body = await req.json();

    if (!user) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }

    const { service, location, date, timeSlot } = body;

    if (!service || !location || !date || !timeSlot) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const bookingDate = new Date(date);
    const { data, error } = await supabase
      .from('bookings')
      .insert([{
        user_name: user.fullName,
        service,
        location,
        date: bookingDate.toISOString(),
        time_slot: timeSlot,
        status: 'processing',
      }])
      .single();

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: error || "Internal server error" },
      { status: 500 }
    );
  }
}

// Method not allowed for other HTTP methods
export async function OPTIONS() {
  return NextResponse.json(
    { error: "Method not allowed" },
    { status: 405 }
  );
}

export async function GET() {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }

    const role = user.publicMetadata?.role;
    let query = supabase.from('bookings').select('*');

    if (role === 'admin') {
    } else if (role === 'coach') {
      query = query.eq('coach_name', user.fullName); // Coaches see only their bookings
    } else {
      query = query.eq('user_name', user.fullName); // Clients see only their bookings
    }

    const { data: bookings, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(bookings, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error + 'Internal server error' }, { status: 500 });
  }
}


export async function DELETE(req: Request) {
  try {
    const { bookingId } = await req.json();
    const { error } = await supabase
      .from('bookings')
      .delete()
      .eq('id', bookingId);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Booking deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error + 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { bookingId, newCoach, newStatus } = await req.json();
    
    const updateData: { coach_name?: string; status?: string } = {};

    if (newCoach) {
      updateData.coach_name = newCoach;
    }
    if (newStatus) {
      updateData.status = newStatus;
    }

    const { error } = await supabase
      .from('bookings')
      .update(updateData)
      .eq('id', bookingId);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error + ' Internal server error' }, { status: 500 });
  }
}
