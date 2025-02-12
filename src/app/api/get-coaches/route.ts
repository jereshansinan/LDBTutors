import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

export async function GET() {
  try {
    const { data: coaches, error } = await supabase
      .from('coaches')
      .select('first_name, last_name');

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Combine first_name and last_name into full name
    const coachNames = coaches.map((coach) => `${coach.first_name} ${coach.last_name}`);

    return NextResponse.json(coachNames, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error +  'Internal server error' }, { status: 500 });
  }
}
