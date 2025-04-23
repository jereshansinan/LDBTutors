import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST() {
  const adminUserIds = [
    "user_2w81Fmif3YYORhssimF4qmnFMn9",
    "user_2w819a9LMFdPNi81JZooZ4myxdH",
    "user_2w7wMpeZgPuDnNsIL7qlazWFXi5",
  ];

  try {
    const client = await clerkClient();

    for (const userId of adminUserIds) {
      await client.users.updateUserMetadata(userId, {
        publicMetadata: {
          role: "admin",
        },
      });
    }
    return NextResponse.json(
      { message: "admins registered successfully!" },
      { status: 200 }
    );
  } catch (clerkError) {
    // Fixed error handling
    console.error("Error updating user role in Clerks:", clerkError);
    console.error("Clerk Response:", clerkError || clerkError);
    return NextResponse.json(
      {
        error: "Clerk user role declare failed",
        details: clerkError || clerkError,
      },
      { status: 422 }
    );
  }
}
