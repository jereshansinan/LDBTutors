import { FaPhone, FaEnvelope, FaWhatsapp, FaInstagram, FaLinkedin, FaTiktok, FaYoutube } from "react-icons/fa";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-white text-black py-10 px-[130px]">
      <div className="flex flex-col lg:flex-row justify-between items-center">
        
        {/* Left Section: Logo & Slogan */}
        <div className="flex flex-col items-center lg:items-start">
          <Image src="/Logowhite.png" alt="Company Logo" width={120} height={50} className="w-20 md:w-32" />
        </div>

        {/* Center Section: Navigation Links */}
        <div className="flex flex-col items-center space-y-2 my-6 lg:my-0">
          <a href="#" className="hover:text-[#75E379]">Home</a>
          <a href="#" className="hover:text-[#75E379]">About</a>
          <a href="#" className="hover:text-[#75E379]">Members</a>
          <a href="#" className="hover:text-[#75E379]">Services</a>
          <a href="#" className="hover:text-[#75E379]">Contact</a>
        </div>

        {/* Right Section: Contact Info & Social Icons */}
        <div className="flex flex-col items-center lg:items-end">
          {/* Phone & Email */}
          <div className="flex items-center space-x-2 mb-2">
            <FaPhone className="text-green-400" />
            <p className="text-sm">+27 65 919 9598</p>
          </div>
          <div className="flex items-center space-x-2">
            <FaEnvelope className="text-blue-400" />
            <p className="text-sm">info@molendesports.co.za</p>
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-4 mt-4">
            <a href="#" className="text-xl text-black hover:text-green-300">
              <FaWhatsapp />
            </a>
            <a href="#" className="text-xl text-black hover:text-pink-400">
              <FaInstagram />
            </a>
            <a href="#" className="text-xl text-black hover:text-blue-400">
              <FaLinkedin />
            </a>
            <a href="#" className="text-xl text-black hover:text-red-600">
              <FaYoutube />
            </a>
            <a href="#" className="text-xl text-black hover:text-gray-300">
              <FaTiktok />
            </a>
          </div>
        </div>

      </div>

      {/* Copyright */}
      <p className="text-center text-gray-500 text-sm mt-6">
        &copy; {new Date().getFullYear()} MondeleSports. All rights reserved.
      </p>
    </footer>
  );
}
