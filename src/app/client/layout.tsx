import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen">
      <Sidebar role="client" /> 
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="p-4">{children}</main>
      </div>
    </div>
  );
};

export default ClientLayout;
