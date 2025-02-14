import Sidebar from "@/components/Sidebar";
import DashboardNavbar from "@/components/DashboardNavbar";

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen">
      <Sidebar role="client" /> 
      <div className="flex flex-col flex-1">
        <DashboardNavbar />
        <main className="md:p-4">{children}</main>
      </div>
    </div>
  );
};

export default ClientLayout;
