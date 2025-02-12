"use client";

import Image from "next/image";
import { useState } from "react";

export default function AddCoachPage() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    profileImageUrl: "",
  });

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);

    // Upload image to Supabase Storage
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const data = await res.json();
    setFormData((prev) => ({ ...prev, profileImageUrl: data.url }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/coaches", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      if (!res.ok) {
        const errorData = await res.json();
        console.error("Error:", errorData);
        alert("Error adding coach: " + (errorData.error || "Unknown error"));
      } else {
        alert("Coach added successfully!");
      }
    } catch (error) {
      console.error("Unexpected Error:", error);
      alert("Unexpected error occurred");
    }
  };
  
  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        {/* Profile Image Upload */}
        <div className="flex flex-col items-center mb-6">
          <label className="cursor-pointer relative">
            <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
            {imagePreview ? (
              <Image
                src={imagePreview}
                alt="Profile"
                width={150}
                height={150}
                className="w-36 h-36 rounded-full object-cover border-4 border-gray-300"
              />
            ) : (
              <div className="w-36 h-36 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-sm font-medium">
                Upload Image
              </div>
            )}
          </label>
        </div>

        {/* Form Fields */}
        <form className="space-y-4 text-black" onSubmit={handleSubmit}>
          <input type="text" name="firstName" placeholder="First Name" className="w-full p-3 border rounded-lg" required onChange={handleChange} />
          <input type="text" name="lastName" placeholder="Last Name" className="w-full p-3 border rounded-lg" required onChange={handleChange} />
          <input type="email" name="email" placeholder="Email" className="w-full p-3 border rounded-lg" required onChange={handleChange} />
          <input type="tel" name="phone" placeholder="Phone Number" className="w-full p-3 border rounded-lg" required onChange={handleChange} />
          
          <select name="gender" className="w-full p-3 border rounded-lg" required onChange={handleChange}>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          {/* Add Coach Button */}
          <button type="submit" className="w-full bg-green-500 text-white p-3 rounded-lg font-semibold hover:bg-green-600 transition">
            Add Coach
          </button>
        </form>
      </div>
    </div>
  );
}
