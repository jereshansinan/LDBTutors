// app/admin/page.tsx (Server Component)
import { currentUser } from "@clerk/nextjs/server";
import AdminDashboard from "@/components/AdminDashboard";

export default async function AdminDashboardWrapper() {
  // Fetch the current user on the server
  const user = await currentUser();
  const userName = user?.firstName || "Admin";

  // Pass the user data to the client component
  return <AdminDashboard userName={userName} />;
}