// app/client/page.tsx (Server Component)
import { currentUser } from "@clerk/nextjs/server";
import ClientDashboard from "@/components/ClientDashboard";

export default async function ClientDashboardWrapper() {
  // Fetch the current user on the server
  const user = await currentUser();
  const userName = user?.firstName || "Client";

  // Pass the user data to the client component
  return <ClientDashboard userName={userName} />;
}
