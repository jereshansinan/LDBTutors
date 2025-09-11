"use client";

import {
  ChevronFirst,
  ChevronLast,
  Home,
  Phone,
  Info,
  HandCoins,
  Dumbbell
} from "lucide-react";
import { createContext, useContext, useState, useEffect } from "react";
import { UserButton } from "@clerk/nextjs"; // Clerk Profile Component
import Image from "next/image";
import Link from "next/link";

// Define types for the links object
type SidebarLink = {
  name: string;
  href: string;
  icon: React.ReactNode;
};

type RoleLinks = {
  client: SidebarLink[];
  coach: SidebarLink[];
  admin: SidebarLink[];
};

type AdditionalLinks = SidebarLink[]; // Define a separate type for additional links

// Define roleLinks object with specific keys and types
const roleLinks: RoleLinks = {
  client: [
    { name: "Book Lesson", href: "/client/book-service", icon: <Home /> },
    { name: "History", href: "/client/history", icon: <Home /> },
  ],
  coach: [
    { name: "View Schedule", href: "/coach/schedule", icon: <Home /> },
    { name: "Check-In", href: "/coach/check-in", icon: <Home /> },
  ],
  admin: [
    { name: "Coaches", href: "/admin/coaches", icon: <Home /> },
    { name: "Bookings", href: "/admin/bookings", icon: <Home /> },
  ],
};

// Additional links like "Services", "Contact", and "About"
const additionalLinks: AdditionalLinks = [
  { name: "Services", href: "/services", icon: <HandCoins /> },
  { name: "Contact", href: "/contact", icon: <Phone /> },
  { name: "Members", href: "/members", icon: <Dumbbell /> },
  { name: "About", href: "/about", icon: <Info /> },
];

// SidebarContext definition
const SidebarContext = createContext<{ expanded: boolean }>({
  expanded: true,
});

export default function Sidebar({ role }: { role: keyof RoleLinks; className?: string }) {
  const [expanded, setExpanded] = useState(true);
  const [translations, setTranslations] = useState({
    sidebar: {
      dashboardSection: "Dashboard",
      additionalSection: "Additional",
      language: "Language",
      links: {
        client: [
          { name: "Book a Service", href: "/client/book-service" },
          { name: "History", href: "/client/history" },
        ],
        coach: [
          { name: "View Schedule", href: "/coach/schedule" },
          { name: "Check-In", href: "/coach/check-in" },
        ],
        admin: [
          { name: "Coaches", href: "/admin/coaches" },
          { name: "Bookings", href: "/admin/bookings" },
        ],
      },
      additionalLinks: [
        { name: "Services", href: "/services" },
        { name: "Contact", href: "/contact" },
        { name: "Members", href: "/members" },
        { name: "About", href: "/about" },
      ],
    },
  });

  useEffect(() => {
    const language = localStorage.getItem("language") || "en"; // Default to English
    fetch(`/locales/${language}.json`)
      .then((response) => response.json())
      .then((data) => setTranslations(data))
      .catch((error) => console.error("Error loading translations:", error));
  }, []);

  const links = roleLinks[role].map((link) => ({
    ...link,
    name: translations.sidebar.links[role].find((l) => l.href === link.href)?.name || link.name,
  }));

  const additionalTranslatedLinks = additionalLinks.map((link) => ({
    ...link,
    name: translations.sidebar.additionalLinks.find((l) => l.href === link.href)?.name || link.name,
  }));

  return (
    <SidebarContext.Provider value={{ expanded }}>
      <aside
        className={`h-screen transition-all ${
          expanded ? "w-64" : "sidebar-collapsed"
        }`}
      >
        <nav className="h-full flex flex-col bg-[#0c0e12] border-r border-black shadow-sm text-white">
          {/* LOGO + TOGGLE BUTTON */}
          <div className="pt-4 p-1 md:p-4 pb-2 flex items-center">
            <Link href="/">
              <Image
                src="/Logowhite.png"
                width={100}
                height={20}
                alt="Logo"
                className={`overflow-hidden transition-all ${
                  expanded ? "w-32" : "w-0"
                }`}
              />
            </Link>
            <button
              onClick={() => setExpanded((curr) => !curr)}
              className="p-1 rounded-lg bg-gray-50 hover:bg-gray-100 ml-auto text-black"
            >
              {expanded ? <ChevronFirst /> : <ChevronLast />}
            </button>
          </div>

          {/* SIDEBAR CONTENT */}
          <ul className="flex-1 px-1 md:px-4">
            {/* Dashboard Section */}
            <h3
              className={`text-sm font-semibold text-white mt-4 mb-2 ${
                expanded ? "" : "hidden"
              }`}
            >
              {translations.sidebar.dashboardSection}
            </h3>

            {links.map((link) => (
              <SidebarItem
                key={link.href}
                href={link.href}
                text={link.name}
                icon={link.icon}
              />
            ))}

            {/* Additional Section */}
            <h3
              className={`text-sm font-semibold text-white mt-4 mb-2 ${
                expanded ? "" : "hidden"
              }`}
            >
              {translations.sidebar.additionalSection}
            </h3>
            {additionalTranslatedLinks.map((link) => (
              <SidebarItem
                key={link.href}
                href={link.href}
                text={link.name}
                icon={link.icon}
              />
            ))}

          </ul>

          <div className="border-t border-black flex p-[2px] sm:p-3 items-center">
            <UserButton afterSignOutUrl="/" />
          </div>
        </nav>
      </aside>
    </SidebarContext.Provider>
  );
}

function SidebarItem({
  href,
  text,
  icon,
}: {
  href: string;
  text: string;
  icon: React.ReactNode;
}) {
  const { expanded } = useContext(SidebarContext);

  return (
    <li className="relative flex items-center py-2 px-2 my-1 font-medium rounded-md cursor-pointer transition-colors group hover:bg-black text-white">
      <Link
        href={href}
        className={`flex items-center w-full ${
          expanded ? "" : "justify-center"
        }`}
      >
        <span className="mr-1 text-lg sm:text-base flex items-center justify-center w-5 h-5 md:w-10 md:h-10">
          {icon}
        </span>
        <span
          className={`overflow-hidden transition-all ${
            expanded ? "w-52 ml-3" : "w-0"
          }`}
        >
          {text}
        </span>
      </Link>
    </li>
  );
}