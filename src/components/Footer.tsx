import { FaPhone, FaEnvelope, FaWhatsapp, FaInstagram, FaLinkedin } from "react-icons/fa";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-white text-black py-10 px-[130px]">
      <div className="flex flex-col lg:flex-row justify-between items-center">
        
        {/* Left Section: Logo & Slogan */}
        <div className="flex flex-col items-center lg:items-start">
          <Image src="/base.png" alt="Company Logo" width={120} height={50} />
          <p className="text-sm text-gray-400 mt-2">Your trusted partner in success.</p>
        </div>

        {/* Center Section: Navigation Links */}
        <div className="flex flex-col items-center space-y-2 my-6 lg:my-0">
          <a href="#" className="hover:text-gray-300">Home</a>
          <a href="#" className="hover:text-gray-300">About</a>
          <a href="#" className="hover:text-gray-300">Services</a>
          <a href="#" className="hover:text-gray-300">Contact</a>
        </div>

        {/* Right Section: Contact Info & Social Icons */}
        <div className="flex flex-col items-center lg:items-end">
          {/* Phone & Email */}
          <div className="flex items-center space-x-2 mb-2">
            <FaPhone className="text-green-400" />
            <p className="text-sm">+1 234 567 890</p>
          </div>
          <div className="flex items-center space-x-2">
            <FaEnvelope className="text-blue-400" />
            <p className="text-sm">contact@mycompany.com</p>
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-4 mt-4">
            <a href="#" className="text-xl text-green-400 hover:text-green-300">
              <FaWhatsapp />
            </a>
            <a href="#" className="text-xl text-pink-500 hover:text-pink-400">
              <FaInstagram />
            </a>
            <a href="#" className="text-xl text-blue-500 hover:text-blue-400">
              <FaLinkedin />
            </a>
          </div>
        </div>

      </div>

      {/* Copyright */}
      <p className="text-center text-gray-500 text-sm mt-6">
        &copy; {new Date().getFullYear()} MyCompany. All rights reserved.
      </p>
    </footer>
  );
}
