import { NextResponse } from "next/server";
import { createClient } from '@supabase/supabase-js';
import { NextRequest } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const coach = url.searchParams.get('coach');

  if (!coach) {
    return NextResponse.json({ error: 'No coach selected' }, { status: 400 });
  }

  const { data: bookings, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('coach_name', coach);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(bookings);
}
