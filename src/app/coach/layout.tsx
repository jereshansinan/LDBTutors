import Sidebar from "@/components/Sidebar";
import DashboardNavbar from "@/components/DashboardNavbar";

const CoachLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen">
      <Sidebar role="coach" /> 
      <div className="flex flex-col flex-1">
        <DashboardNavbar />
        <main className="p-4">{children}</main>
      </div>
    </div>
  );
};

export default CoachLayout;
