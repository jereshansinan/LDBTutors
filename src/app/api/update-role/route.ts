import { clerkClient } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  // Parse the request to get userId
  const { userId } = await request.json();

  try {
    // Update the user's role to 'client'
    const client = await clerkClient()

    await client.users.updateUserMetadata(userId, {
      publicMetadata: {
        role: 'client', // Set the default role
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating role:', error);
    return NextResponse.json({ success: false, error: error });
  }
}
