import Sidebar from "@/components/Sidebar";
import DashboardNavbar from "@/components/DashboardNavbar";

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen overflow-hidden">
          {/* Sidebar should not scroll */}
          <Sidebar role="client" className="h-screen sticky top-0" /> 
    
          {/* Main content should scroll */}
          <div className="flex flex-col flex-1 h-screen overflow-y-auto">
            <DashboardNavbar />
            <main className="p-4">{children}</main>
          </div>
        </div>
  );
};

export default ClientLayout;
