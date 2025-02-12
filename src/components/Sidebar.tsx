import Link from "next/link";

type SidebarLink = {
  name: string;
  href: string;
};

const Sidebar = ({ role }: { role: string }) => {
  let links: SidebarLink[] = []; // Explicitly define links as an array of SidebarLink objects

  if (role === "client") {
    links = [
      { name: "Book a Service", href: "/client/book-service" },
      { name: "History", href: "/client/history" },
    ];
  } else if (role === "coach") {
    links = [
      { name: "View Schedule", href: "/coach/schedule" },
      { name: "Check-In", href: "/coach/check-in" },
    ];
  } else if (role === "admin") {
    links = [
      { name: "Coaches", href: "/admin/coaches" },
      { name: "Bookings", href: "/admin/bookings" }
    ];
  }

  return (
    <aside className="w-64 bg-gray-800 text-white h-screen p-4">
      <h2 className="text-xl font-bold mb-4">{role.toUpperCase()} Dashboard</h2>
      <ul>
        {links.map((link) => (
          <li key={link.href} className="mb-2">
            <Link href={link.href} className="block p-2 rounded hover:bg-gray-700">
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
