import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const fileBuffer = await file.arrayBuffer();
    const fileName = `coaches/${Date.now()}_${file.name}`;

    const { error } = await supabase.storage
      .from("profiles")
      .upload(fileName, fileBuffer, {
        cacheControl: "3600",
        upsert: true,
        contentType: file.type, 
      });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // ✅ Correct way to get the public URL
    const { data: publicUrlData } = supabase.storage.from("profiles").getPublicUrl(fileName);
    console.log("", publicUrlData.publicUrl)
    return NextResponse.json({ url: publicUrlData.publicUrl }, { status: 200 });
    
  } catch (err) {
    return NextResponse.json({ error: err + "Internal Server Error" }, { status: 500 });
  }
}
