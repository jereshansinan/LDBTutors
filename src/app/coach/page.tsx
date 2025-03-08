// app/coach/page.tsx (Server Component)
import { currentUser } from "@clerk/nextjs/server";
import CoachDashboard from "@/components/CoachDashboard";

export default async function CoachDashboardWrapper() {
  // Fetch the current user on the server
  const user = await currentUser();
  const userName = user?.firstName || "Coach";

  // Pass the user data to the client component
  return <CoachDashboard userName={userName} />;
}