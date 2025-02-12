import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, phone, gender, profileImageUrl } = body;

    if (!firstName || !lastName || !email || !phone || !gender) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const { error } = await supabase.from("coaches").insert([
      {
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
        gender,
        profile_image_url: profileImageUrl, // Store the image URL
      },
    ]);

    if (error) {
      console.error("Error inserting coach:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Coach added successfully!" }, { status: 200 });
  } catch (err) {
    console.error("Internal Server Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
