import { currentUser } from "@clerk/nextjs/server";
import { createClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from "next";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "DELETE") {
      const user = await currentUser();
      if (!user) {
        return res.status(401).json({ error: "User not authenticated" });
      }

      const { bookingId } = req.query;

      if (!bookingId) {
        return res.status(400).json({ error: "Booking ID is required" });
      }

      // Fetch the booking to check its status and cancellation time
      const { data, error } = await supabase
        .from('bookings')
        .select('id, status, date')
        .eq('id', bookingId)
        .single();

      if (error || !data) {
        return res.status(404).json({ error: "Booking not found" });
      }

      const bookingDate = new Date(data.date);
      const currentDate = new Date();

      // Check if the booking can be canceled (within 24 hours)
      const timeDifference = currentDate.getTime() - bookingDate.getTime();
      const hoursDifference = timeDifference / (1000 * 3600);

      if (hoursDifference > 24) {
        return res.status(400).json({ error: "Booking can only be canceled within 24 hours" });
      }

      // Ensure booking status is not "completed" before canceling
      if (data.status === "completed") {
        return res.status(400).json({ error: "Completed bookings cannot be canceled" });
      }

      // Proceed to delete the booking
      const { error: deleteError } = await supabase
        .from('bookings')
        .delete()
        .eq('id', bookingId);

      if (deleteError) {
        return res.status(500).json({ error: deleteError.message });
      }

      return res.status(200).json({ message: "Booking successfully canceled" });
    } else {
      return res.status(405).json({ error: "Method not allowed" });
    }
  } catch (error) {
    return res.status(500).json({ error: error || "Internal server error" });
  }
}
