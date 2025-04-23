import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const adminUserIds = [
  "user_2w81Fmif3YYORhssimF4qmnFMn9",
  "user_2w819a9LMFdPNi81JZooZ4myxdH",
  "user_2w7wMpeZgPuDnNsIL7qlazWFXi5",
];

export async function GET() {
  const client = await clerkClient()
  try {
    for (const userId of adminUserIds) {
      await client.users.updateUserMetadata(userId, {
        publicMetadata: {
          role: "admin",
        },
      });
    }
    return NextResponse.json({ message: "Admins registered successfully!" });
  } catch (clerkError) {
    console.error("Error updating user roles:", clerkError);
    return NextResponse.json(
      {
        error: "Failed to update roles",
        details: clerkError,
      },
      { status: 500 }
    );
  }
}
