"use client";
import { UserButton, SignInButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { usePathname } from "next/navigation";
import ClientSignInButton from "@/components/clientSignInButton";
import Image from "next/image";

import { ChevronDown } from "lucide-react";
import LanguageDropdown from "./LanguageDropdown";

export default function Navbar() {
  const { user, isSignedIn } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const [translations, setTranslations] = useState({
    navbar: {
      logoAlt: "Logo",
      navLinks: [
        { title: "HOME", url: "/" },
        { title: "ABOUT", url: "/about" },
        { title: "OUR TEAM", url: "/members" },
        { title: "SERVICES", url: "/services" },
        { title: "CONTACT", url: "/contact" },
      ],
      dashboardButton: "Go to Dashboard",
      loginButton: "Login",
      language: "LANGUAGE",
    },
  });

  const [currentLanguage, setCurrentLanguage] = useState("en");

  useEffect(() => {
    // Fetch language preference from localStorage after component mounts
    const storedLanguage = localStorage.getItem("language") || "en";
    setCurrentLanguage(storedLanguage);
  }, []);

  useEffect(() => {
    fetch(`/locales/${currentLanguage}.json`)
      .then((response) => response.json())
      .then((data) => setTranslations(data))
      .catch((error) => console.error("Error loading translations:", error));
  }, [currentLanguage]);

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 769);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleDashboardClick = () => {
    setIsLoading(true); // Show loading state
    const role = user?.publicMetadata?.role;
    const dashboardURL =
      role === "admin" ? "/admin" : role === "coach" ? "/coach" : "/client";
    router.push(dashboardURL);

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const isSpecialPage =
    pathname.startsWith("/coach") ||
    pathname.startsWith("/client") ||
    pathname.startsWith("/admin");

  return (
    <>
      {!isMobile ? (
        <nav
          className={`fixed top-0 pt-0 left-0 w-full z-50 transition-all duration-300 ${
            isSpecialPage || isScrolled
              ? "bg-white shadow-md pt-0"
              : "bg-transparent"
          }`}
        >
          <div className="flex justify-between mx-auto items-center py-4 px-14">
            <Link
              href="/"
              className={`font-bold text-xl ${
                isSpecialPage || isScrolled ? "text-black" : "text-white"
              }`}
            >
              <Image
                src={`${
                  isSpecialPage || isScrolled
                    ? "/Logowhite.png"
                    : "/logoDark.png"
                }`}
                width={100}
                height={20}
                alt={translations.navbar.logoAlt}
                className="overflow-hidden transition-all w-32 mr-2"
              />
            </Link>
            <ul className="flex gap-8 md:gap-6 items-center justify-center text-center cursor-pointer font-body antialiased">
              {translations.navbar.navLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.url}
                    className={`relative md:text[14px] xl:text-[16px] leading-6 transition-colors duration-300 font-body tracking-[1px] 
                      ${
                        isSpecialPage || isScrolled
                          ? "text-black"
                          : "text-white"
                      } 
                      after:content-[''] after:absolute after:left-0 after:bottom-[-5px] 
                      after:w-0 after:h-[4px] after:bg-[#fa5407] after:rounded-xl 
                      after:transition-all after:duration-300 hover:after:w-full`}
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="flex gap-4 items-center cursor-pointer font-body">
              {/* Language Toggle Switch for Desktop */}
              <div className="flex items-center">
                {/* Language Toggle Switch */}
              </div>

              {isSignedIn ? (
                <div className="flex items-center gap-4">
                  <Button
                    onClick={handleDashboardClick}
                    className="bg-[#fa5407] text-black text-xl hover:text-white font-body"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader2 className="animate-spin w-4 h-4" />
                    ) : (
                      translations.navbar.dashboardButton
                    )}
                  </Button>
                  <UserButton />
                </div>
              ) : (
                <ClientSignInButton />
              )}
            </ul>
          </div>
        </nav>
      ) : (
        <nav
          className={`fixed top-0 left-0 w-full z-50 py-4 px-4 transition-all duration-300 ${
            isSpecialPage || isScrolled
              ? "bg-white shadow-md"
              : "bg-transparent"
          }`}
        >
          <div className="mx-auto flex justify-between items-center">
            <div
              className={`font-bold text-xl ${
                isSpecialPage || isScrolled ? "text-black" : "text-white"
              }`}
            >
              <Link
                href="/"
                className={`font-bold text-xl ${
                  isSpecialPage || isScrolled ? "text-black" : "text-white"
                }`}
              >
                <Image
                  src={`${
                    isSpecialPage || isScrolled
                      ? "/Logowhite.png"
                      : "/logoDark.png"
                  }`}
                  width={120}
                  height={50}
                  alt={translations.navbar.logoAlt}
                  className="overflow-hidden transition-all w-28 md:w-20"
                />
              </Link>
            </div>
            <div className="flex justify-end items-center gap-6 cursor-pointer">
              {isSignedIn ? (
                <div className="flex items-center gap-4">
                  <Button
                    onClick={handleDashboardClick}
                    className={`bg-[#fa5407] text-black rounded-md ${
                      isMobile ? "px-2 py-1 text-xs" : "px-4 py-2 text-base"
                    }`}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader2 className="animate-spin w-4 h-4" />
                    ) : (
                      translations.navbar.dashboardButton
                    )}
                  </Button>
                </div>
              ) : (
                <SignInButton>
                  <Button
                    className={`bg-[#fa5407] text-black rounded-md hover:text-white ${
                      isMobile ? "px-2 py-1 text-xs" : "px-4 py-2 text-base"
                    }`}
                  >
                    {translations.navbar.loginButton}
                  </Button>
                </SignInButton>
              )}
              <FaBars
                onClick={toggleModal}
                className={`cursor-pointer transition-colors duration-300 ${
                  isSpecialPage || isScrolled ? "text-black" : "text-white"
                }`}
              />
            </div>
          </div>

          {/* Modal */}
          <div
            className={`fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 transition-opacity duration-500 ${
              showModal ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <div className="relative bg-white w-full h-full max-w-sm p-8">
              <FaTimes
                className="absolute top-4 right-4 cursor-pointer"
                onClick={toggleModal}
              />
              <div className="flex flex-col gap-6 items-center pt-5">
                {translations.navbar.navLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.url}
                    className="text-black text-xl cursor-pointer"
                  >
                    {link.title}
                  </Link>
                ))}
                {/* Language Dropdown */}
                <li className="relative flex px-2 text-xl font-medium rounded-md cursor-pointer transition-colors group hover:bg-indigo-50 text-black capitalize">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center w-full"
                  >
                    <ChevronDown />
                    <span
                      className={`overflow-hidden transition-all w-52"
                      }`}
                    >
                      {translations.navbar.language}
                    </span>
                  </button>

                  {/* Dropdown content */}
                  {dropdownOpen && <LanguageDropdown />}
                </li>
              </div>
            </div>
          </div>
        </nav>
      )}
    </>
  );
}
