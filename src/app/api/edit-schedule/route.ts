import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function PUT(req: NextRequest) {
  const { bookingId, newDate } = await req.json();

  const { error } = await supabase
    .from('bookings')
    .update({ date: newDate })
    .eq('id', bookingId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: 'Booking updated successfully' });
}
