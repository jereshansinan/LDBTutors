"use client";

import { ChevronFirst, ChevronLast, Home, Phone, Info, ChevronDown } from "lucide-react";
import { createContext, useContext, useState } from "react";
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
        { name: "Book a Service", href: "/client/book-service", icon: <Home /> },
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
    { name: "Services", href: "/services", icon: <Phone /> },
    { name: "Contact", href: "/contact", icon: <Phone /> },
    { name: "About", href: "/about", icon: <Info /> },
];

// SidebarContext definition
const SidebarContext = createContext<{ expanded: boolean }>({
    expanded: true,
});

export default function Sidebar({ role }: { role: keyof RoleLinks }) {
    const [expanded, setExpanded] = useState(true);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const links = roleLinks[role];

    return (
        <SidebarContext.Provider value={{ expanded }}>
            <aside className={`h-screen transition-all ${expanded ? "w-64" : "sidebar-collapsed"}`}>
                <nav className="h-full flex flex-col bg-white border-r shadow-sm">
                    {/* LOGO + TOGGLE BUTTON */}
                    <div className="pt-4 p-1 md:p-4 pb-2 flex items-center">
                        <Image
                            src="/base.jpg"
                            width={100}
                            height={20}
                            alt="Logo"
                            className={`overflow-hidden transition-all ${expanded ? "w-32" : "w-0"}`}
                        />
                        <button
                            onClick={() => setExpanded((curr) => !curr)}
                            className="p-1 rounded-lg bg-gray-50 hover:bg-gray-100"
                        >
                            {expanded ? <ChevronFirst /> : <ChevronLast />}
                        </button>
                    </div>

                    {/* SIDEBAR CONTENT */}
                    <ul className="flex-1 px-1 md:px-2">
                        {/* Dashboard Section */}
                        <h3 className={`text-sm font-semibold text-gray-600 mt-4 mb-2 ${expanded ? "" : "hidden"}`}>
                            Dashboard
                        </h3>

                        {links.map((link) => (
                            <SidebarItem key={link.href} href={link.href} text={link.name} icon={link.icon} />
                        ))}

                        {/* Additional Section */}
                        <h3 className={`text-sm font-semibold text-gray-600 mt-4 mb-2 ${expanded ? "" : "hidden"}`}>Additional</h3>
                        {additionalLinks.map((link) => (
                            <SidebarItem key={link.href} href={link.href} text={link.name} icon={link.icon} />
                        ))}

                        {/* Language Dropdown */}
                        <li className="relative flex py-2 px-2 my-1 font-medium rounded-md cursor-pointer transition-colors group hover:bg-indigo-50 text-gray-600">
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="flex items-center w-full"
                            >
                                <ChevronDown className="mr-2" />
                                <span className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"} text-left`}>
                                    Language
                                </span>
                            </button>

                            {/* Dropdown content */}
                            {dropdownOpen && (
                                <ul className="absolute left-0 top-full mt-2 bg-white border rounded-md shadow-md w-full z-10">
                                    <li>
                                        <button className="w-full px-3 py-2 text-gray-700 hover:bg-gray-100">English</button>
                                    </li>
                                    <li>
                                        <button className="w-full px-3 py-2 text-gray-700 hover:bg-gray-100">French</button>
                                    </li>
                                </ul>
                            )}
                        </li>

                    </ul>

                    <div className="border-t flex p-[2px] sm:p-3 items-center">
                        <UserButton afterSignOutUrl="/"/>
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
        <li className="relative flex items-center py-2 px-2 my-1 font-medium rounded-md cursor-pointer transition-colors group hover:bg-indigo-50 text-gray-600">
            <Link href={href} className={`flex items-center w-full ${expanded ? "" : "justify-center"}`}>
                <span className="mr-1 text-lg sm:text-base flex items-center justify-center w-5 h-5 md:w-10 md:h-10">
                    {icon}
                </span>
                <span className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}>
                    {text}
                </span>
            </Link>
        </li>
    );
}

