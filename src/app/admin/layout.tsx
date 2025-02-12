import Sidebar from "@/components/Sidebar";
import DashboardNavbar from "@/components/DashboardNavbar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen">
      <Sidebar role="admin" /> 
      <div className="flex flex-col flex-1">
        <DashboardNavbar />
        <main className="p-4">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
