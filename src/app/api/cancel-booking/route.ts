import { currentUser } from "@clerk/nextjs/server";
import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function DELETE(req: NextRequest) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const bookingId = searchParams.get("bookingId");

    if (!bookingId) {
      return NextResponse.json({ error: "Booking ID is required" }, { status: 400 });
    }

    // Fetch the booking
    const { data, error } = await supabase
      .from("bookings")
      .select("id, status, date")
      .eq("id", bookingId)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    const bookingDate = new Date(data.date);
    const currentDate = new Date();

    // Check if the booking can be canceled (within 24 hours)
    const timeDifference = currentDate.getTime() - bookingDate.getTime();
    const hoursDifference = timeDifference / (1000 * 3600);

    if (hoursDifference > 24) {
      return NextResponse.json({ error: "Booking can only be canceled within 24 hours" }, { status: 400 });
    }

    if (data.status === "completed") {
      return NextResponse.json({ error: "Completed bookings cannot be canceled" }, { status: 400 });
    }

    // Delete the booking
    const { error: deleteError } = await supabase
      .from("bookings")
      .delete()
      .eq("id", bookingId);

    if (deleteError) {
      return NextResponse.json({ error: deleteError.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Booking successfully canceled" }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: error + "Internal server error" }, { status: 500 });
  }
}
