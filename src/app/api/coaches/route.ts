import { createClient } from '@supabase/supabase-js';
import { clerkClient } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  
  try {
    console.log("Received a request to register a coach.");

    // Parse request body
    const body = await req.json();
    console.log("Request body parsed:", body);

    const { firstName, lastName, email, phone, gender, password } = body;

    if (!firstName || !lastName || !email || !phone || !gender || !password) {
      console.error("Missing required fields:", { firstName, lastName, email, phone, gender, password });
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    console.log("All required fields are present. Proceeding with Clerk user creation.");

    // Step 1: Create the user in Clerk
    try {
      const client = await clerkClient()
      const user = await client.users.createUser({
        firstName: firstName,
        lastName: lastName,
        emailAddress: [email],
        password: password,
      });

      console.log("Clerk user created successfully:", user);

      if (!user || !user.id) {
        console.error("Clerk user creation failed:", user);
        return NextResponse.json({ error: 'Failed to create user in Clerk' }, { status: 500 });
      }

      const userId = user.id; // Clerk user ID
      console.log("Clerk User ID:", userId);

      // Step 2: Update the user's role in Clerk
      console.log("Updating Clerk user role to 'coach'.");
      await client.users.updateUserMetadata(userId, {
        publicMetadata: {
          role: 'coach',
        },
      });

      console.log("Clerk user role updated successfully.");

      // Step 3: Insert the coach into Supabase
      console.log("Inserting coach into Supabase.");
      const { error } = await supabase.from('coaches').insert([
        {
          first_name: firstName,
          last_name: lastName,
          email,
          phone,
          gender,
        },
      ]);

      if (error) {
        console.error('Error inserting coach into Supabase:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      console.log("Coach inserted into Supabase successfully.");
      return NextResponse.json({ message: 'Coach registered successfully!' }, { status: 200 });
    } catch (clerkError) {  // Fixed error handling
      console.error("Error creating user in Clerk:", clerkError);
      console.error("Clerk Response:", clerkError || clerkError);
      return NextResponse.json({ error: 'Clerk user creation failed', details: clerkError || clerkError }, { status: 422 });
    }
  } catch (err) {
    console.error('Internal Server Error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
